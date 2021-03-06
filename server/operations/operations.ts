import { Connection } from './connection';
import { CommonJs } from './common';
import { ObjectId, ObjectID } from 'mongodb';
import { SendMail } from './sendMail';
import { AppKeys } from '../utils/AppKeys';

const CommonJSInstance = new CommonJs();
const AppKeysInstance = new AppKeys();

export class Operations {

    /**
     * Login of user
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static login(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var collection = db.collection('users');
                collection.find({ email: obj.email.toLowerCase(), deletedStatus: 0 }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    if (data && data.length !== 0) {
                        obj.salt = data[0].salt ? data[0].salt : 'any';
                        CommonJs.randomPassword(obj.salt, obj.password, (password, salt) => {
                            collection.find({ email: obj.email.toLowerCase(), password: password }, { projection: { password: 0, salt: 0 } }).toArray((err, data) => {
                                if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                                else if (data && data.length !== 0) CommonJs.close(client, CommonJSInstance.SUCCESS, data[0], cb);
                                else CommonJs.close(client, CommonJSInstance.NOT_VALID, [], cb);
                            })
                        })
                    } else CommonJs.close(client, CommonJSInstance.NOT_VALID, [], cb);
                });
            }
        })
    }

    /**
     * Signup user
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static signup(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var collection = db.collection('users');
                CommonJs.randomPassword(obj.email.toLowerCase(), obj.password, (password, salt) => {
                    collection.find({ email: obj.email.toLowerCase() }).toArray((err, data) => {
                        if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                        if (data && data.length === 0) {
                            CommonJs.generateToken(obj.email.toLowerCase(), (TOKEN, salt) => {
                                if (TOKEN) {
                                    collection.insert({
                                        email: obj.email.toLowerCase(),
                                        password: password,
                                        userType: obj.userType,
                                        firstName: obj.firstName,
                                        lastName: obj.lastName,
                                        status: 0,
                                        deletedStatus: 0,
                                        userAccessToken: TOKEN,
                                        salt: salt,
                                        createdTime: new Date().getTime(),
                                        updatedTime: new Date().getTime()
                                    }, (err, data) => {
                                        if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                                        else {
                                            // var response = data.ops[0];
                                            this.getCollectionData({ email: obj.email.toLowerCase() }, collection, { projection: { password: 0, salt: 0 } }, client, cb);
                                        }
                                    });
                                } else CommonJs.close(client, CommonJSInstance.TOKEN_ERROR, [], cb);
                            });
                        } else CommonJs.close(client, CommonJSInstance.PRESENT, [], cb);
                    })
                })
            }
        })
    }

    /**
     * Get collection data
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static getCollectionData(obj, collection, excludeVal, client, cb) {
        collection.find(obj, excludeVal).toArray((err, data) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else if (data && data.length !== 0) CommonJs.close(client, CommonJSInstance.SUCCESS, data[0], cb);
            else CommonJs.close(client, CommonJSInstance.NOVALUE, [], cb);
        });
    }

    /**
     * Get user data
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static getUserData(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var collection = db.collection('users');
                collection.find({ _id: ObjectId(obj.id), deletedStatus: 0 }, { projection: { password: 0, salt: 0, userAccessToken: 0 } }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    else if (data && data.length !== 0) CommonJs.close(client, CommonJSInstance.SUCCESS, data[0], cb);
                    else CommonJs.close(client, CommonJSInstance.NOT_VALID, [], cb);
                })
            }
        })
    }

    /**
     * Friend request
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static sendFriendRequest(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var friendRequest = db.collection('friendRequests');

                friendRequest.find({ uid: new ObjectId(obj.uid), fid: new ObjectId(obj.fid) }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    else if (data && data.length === 0) {
                        friendRequest.insert({
                            uid: new ObjectId(obj.uid),
                            fid: new ObjectId(obj.fid),
                            status: AppKeysInstance.AWAITING,
                            createdTime: CommonJSInstance.EPOCH_TIME,
                            updatedTime: CommonJSInstance.EPOCH_TIME
                        }, (err, data) => {
                            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                            else CommonJs.close(client, CommonJSInstance.SUCCESS, data, cb);
                        });
                    } else CommonJs.close(client, CommonJSInstance.PRESENT, [], cb);
                })
            }
        })
    }

    /**
     * Friend request accept/decline
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static responseFriendRequest(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var friendRequest = db.collection('friendRequests');

                friendRequest.find({ _id: new ObjectId(obj.request_id), status: AppKeysInstance.AWAITING }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    else if (data && data.length !== 0) {
                        friendRequest.update({ _id: new ObjectId(obj.request_id), status: AppKeysInstance.AWAITING }, {
                            $set: {
                                status: obj.status,
                                updatedTime: CommonJSInstance.EPOCH_TIME
                            }
                        }, (err, data) => {
                            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                            else CommonJs.close(client, obj.status === AppKeysInstance.ACCEPTED ? CommonJSInstance.REQUEST_ACCEPTED : CommonJSInstance.REQUEST_DECLINED, data, cb);
                        });
                    } else CommonJs.close(client, CommonJSInstance.NOVALUE, [], cb);
                })
            }
        })
    }

    /**
     * Friend request accept/decline save friends in collection
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static responseFriendRequestSaveFriends(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var friends = db.collection('friends');

                friends.find({ uid: new ObjectId(obj.uid) }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    else if (data && data.length !== 0) {
                        friends.update({ uid: new ObjectId(obj.uid), "friends.id": { $ne: new ObjectId(obj.fid) } }, {
                            $addToSet: {
                                friends: {
                                    id: new ObjectId(obj.fid),
                                    createdTime: CommonJSInstance.EPOCH_TIME
                                }
                            }
                        }, (err, data) => {
                            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                            else CommonJs.close(client, CommonJSInstance.SUCCESS, data, cb);
                        });
                    } else friends.insert({
                        uid: new ObjectId(obj.uid),
                        friends: [{
                            id: new ObjectId(obj.fid),
                            createdTime: CommonJSInstance.EPOCH_TIME
                        }]
                    }, (err, data) => {
                        if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                        else CommonJs.close(client, CommonJSInstance.SUCCESS, data, cb);
                    });
                })
            }
        })
    }

    /**
     * Get friends list with friends info
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static friendsList(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var friends = db.collection('friends');

                friends.aggregate([
                    { $match: { _id: new ObjectId("5b5a3e10b3a80c0d7c62a0bc") } },
                    { $unwind: "$friends" },
                    {
                        $lookup: {
                            "from": "users",
                            "foreignField": "_id",
                            "localField": "friends.id",
                            "as": "info"
                        }
                    },
                    { $unwind: "$info" },
                    {
                        $project: {
                            "_id": 0,
                            "uid": 1,
                            "info._id": 1,
                            "info.email": 1,
                            "info.firstName": 1,
                            "info.lastName": 1,
                            "info.status": 1,
                            "info.deletedStatus": 1,
                            "info.createdTime": 1,
                            "info.updatedTime": 1
                        }
                    },
                    {
                        $group: {
                            "_id": 0,
                            "uid": { $first: "$uid" },
                            "info": { $push: "$info" }
                        }
                    }
                ], (err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    else data.toArray((err, data) => {
                        if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                        else CommonJs.close(client, CommonJSInstance.SUCCESS, data, cb);
                    });
                });
            }
        })
    }

    /**
     * Forget password
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static forgetPassword(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var collection = db.collection('users');
                collection.find({ email: obj.email.toLowerCase() }).toArray((err, data) => {
                    console.log(obj, data);
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    if (data && data.length !== 0) {

                        //Create random password key
                        obj.randomPassword = Math.floor(Math.random() * 1000000) + '';

                        CommonJs.decryptData(data[0].salt, data[0].password, (password, salt) => {
                            obj.password = password;
                            SendMail.forgetPassword(obj, (status, response) => CommonJs.close(client, CommonJSInstance.SUCCESS, [], cb));
                        })
                    } else CommonJs.close(client, CommonJSInstance.NOVALUE, [], cb);
                })
            }
        })
    }

    /**
     * Verification
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static verification(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var collection = db.collection('users');

                CommonJs.randomPassword(obj.email.toLowerCase(), obj.token, (token, salt) => {
                    collection.find({ email: obj.email.toLowerCase(), verificationCode: 0, verificationToken: token }).toArray((err, data) => {
                        if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                        if (data && data.length !== 0) {
                            collection.update({ email: obj.email.toLowerCase(), verificationCode: 0, verificationToken: token }, {
                                $set: {
                                    verificationCode: 1,
                                    verificationToken: null,
                                    updatedTime: new Date().getTime()
                                }
                            }, (err, data) => {
                                if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb)
                                else CommonJs.close(client, CommonJSInstance.SUCCESS, data, cb);
                            })
                        } else CommonJs.close(client, CommonJSInstance.NOT_VALID, [], cb);
                    })
                });
            }
        })
    }

    /**
     * Logout of user
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static logout(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var collection = db.collection('users');
                collection.find({ _id: new ObjectId(obj.id), userAccessToken: obj.accessToken }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    if (data && data.length !== 0) {
                        CommonJs.generateToken(obj.id.toLowerCase(), (TOKEN, salt) => {
                            if (TOKEN) {
                                collection.update({ _id: new ObjectId(obj.id), userAccessToken: obj.accessToken }, {
                                    $set: {
                                        userAccessToken: TOKEN,
                                        updatedTime: new Date().getTime()
                                    }
                                }, (err, success) => {
                                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                                    else {
                                        var temp = data[0];
                                        temp.password = "xxxxxx";
                                        temp.salt = "xxxxxx";
                                        temp.userAccessToken = TOKEN;
                                        CommonJs.close(client, CommonJSInstance.SUCCESS, temp, cb);
                                    }
                                });
                            } else CommonJs.close(client, CommonJSInstance.TOKEN_ERROR, [], cb);
                        });
                    } else CommonJs.close(client, CommonJSInstance.NOVALUE, [], cb);
                })
            }
        })
    }

    /**
     * Is user logged in
     */
    static isUserLoggedIn(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var users = db.collection('users');

                users.find({ _id: new ObjectId(obj.id) }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    if (data && data.length !== 0) {
                        users.find({ _id: new ObjectId(obj.id), userAccessToken: obj.accessToken, deletedStatus: 0 }).toArray((err, data) => {
                            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                            else if (data && data.length !== 0) CommonJs.close(client, CommonJSInstance.LOGED_IN, [], cb);
                            else CommonJs.close(client, CommonJSInstance.LOGED_OUT, [], cb);
                        });
                    } else CommonJs.close(client, CommonJSInstance.NOT_VALID, [], cb);
                });
            }
        });
    }
}