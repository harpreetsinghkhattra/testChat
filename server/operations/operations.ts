import { Connection } from './connection';
import { CommonJs } from './common';
import { ObjectId, ObjectID } from 'mongodb';
import { SendMail } from './sendMail';

const CommonJSInstance = new CommonJs();
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
                                else this.isUserLoggedIn(obj, collection, client, cb);
                            })
                        })
                    } else this.isUserLoggedIn(obj, collection, client, cb);
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
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    if (data && data.length !== 0) {

                        //Create random password key
                        obj.randomPassword = Math.floor(Math.random() * 1000000) + '';

                        CommonJs.decryptData(data[0].salt, data[0].password, (password, salt) => {
                            obj.password = password;
                            SendMail.forgetPassword(obj, (status, response) => CommonJs.close(client, CommonJSInstance.SUCCESS, [], cb));
                        })
                    } else this.isUserLoggedIn(obj, collection, client, cb);
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
                        } else this.isUserLoggedIn(obj, collection, client, cb);
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
                    } else this.isUserLoggedIn(obj, collection, client, cb);
                })
            }
        })
    }

    /**
     * Reset password
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static resetPassword(obj, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {

                var collection = db.collection('users');
                collection.find({ _id: new ObjectId(obj.id), userAccessToken: obj.accessToken }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    if (data && data.length !== 0) {

                        CommonJs.randomPassword(obj.email.toLowerCase(), obj.password, (password, salt) => {
                            collection.update({ _id: new ObjectId(obj.id), userAccessToken: obj.accessToken }, {
                                $set: {
                                    password: password,
                                    salt: salt,
                                    requireResetPassword: false,
                                    updatedTime: new Date().getTime()
                                }
                            }, (err, data) => {
                                if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb)
                                else CommonJs.close(client, CommonJSInstance.SUCCESS, [], cb);
                            })
                        });
                    } else this.isUserLoggedIn(obj, collection, client, cb);
                });
            }
        })
    }

    /**
     * Internally check email is present or not
     */
    static isEmailPresent(email, cb) {
        Connection.connect((err, db, client) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            else {
                var users = db.collection('users');
                var lawyerClients = db.collection('lawyerClients');

                // Check in users
                users.find({ email: email.toLowerCase() }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    if (data && data.length === 0) {

                        // Check in lawyers
                        lawyerClients.find({ email: email.toLowerCase() }).toArray((err, data) => {
                            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                            if (data && data.length === 0) cb(true);
                            else cb(false);
                        });
                    } else cb(false);;
                });
            }
        })
    }

    /**
     * Is user logged in
     */
    static isUserLoggedIn(obj, users, client, cb) {
        users.find({ _id: new ObjectId(obj.id) }).toArray((err, data) => {
            if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
            if (data && data.length !== 0) {
                users.find({ _id: new ObjectId(obj.id), userAccessToken: obj.accessToken, deletedStatus: 0 }).toArray((err, data) => {
                    if (err) CommonJs.close(client, CommonJSInstance.ERROR, err, cb);
                    // if (data && data.length !== 0) cb(CommonJSInstance.LOGED_IN);
                    if (data && data.length !== 0) CommonJs.close(client, CommonJSInstance.LOGED_IN, [], cb);
                    else CommonJs.close(client, CommonJSInstance.LOGED_OUT, [], cb);
                });
            } else CommonJs.close(client, CommonJSInstance.NOT_VALID, [], cb);
        });
    }
}