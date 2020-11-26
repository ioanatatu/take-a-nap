const spicedPg = require("spiced-pg");
// const dbUrl = process.env.DATABASE_URL || require("./db-secret");
const dbUrl =
    process.env.DATABASE_URL || "postgres://postgres:ioana@localhost:5432/nap";
const db = spicedPg(dbUrl);

/*
 *
 * ___________________________________________________________________users
 */
module.exports.addUser = (first, last, email, pass, avatar) => {
    const q = `INSERT into users (first, last, email, pass, avatar, created_at)
    VALUES ($1, $2, $3, $4, $5, current_timestamp) RETURNING id;`;

    const params = [first, last, email, pass, avatar];
    return db.query(q, params);
};
module.exports.getUser = (id) =>
    db.query(`SELECT id, first, last, email, avatar FROM users where id=$1`, [
        id,
    ]);

module.exports.getLoginUser = (email) =>
    db.query(`SELECT id, email, pass FROM users where email=$1`, [email]);

module.exports.deleteUser = (id) =>
    db.query(`DELETE FROM users WHERE id=$1;`, [id]);
/*
 *
 * ___________________________________________________________________profiles
 */
module.exports.getUserProfile = (id) =>
    db.query(`SELECT * FROM profiles WHERE user_id=$1`, [id]);

module.exports.updateUserProfile = (user_id, age, city, pet, url) => {
    const q = `
        INSERT INTO profiles (user_id, age, city, pet, url, updated_at)
        values ($1, $2, $3, $4, $5, current_timestamp)
        ON CONFLICT (user_id)
        DO UPDATE SET user_id = $1, age = $2, city = $3, pet = $4, url=$5, updated_at=current_timestamp RETURNING updated_at;`;

    const params = [user_id, age, city, pet, url];

    return db.query(q, params);
};
module.exports.deleteProfile = (id) =>
    db.query(`DELETE FROM profiles WHERE user_id=$1;`, [id]);
/*
 *
 * ___________________________________________________________________signatures
 */
module.exports.upsertSignature = (user_id, signature) => {
    const q = `INSERT INTO signatures (user_id, signature, updated_at) 
        VALUES($1, $2, current_timestamp) 
        ON CONFLICT (user_id)
        DO UPDATE SET user_id=$1, signature=$2, updated_at=current_timestamp RETURNING signature, updated_at;`;
    return db.query(q, [user_id, signature]);
};
module.exports.getSignature = (id) =>
    db.query(`SELECT * FROM signatures where user_id=$1`, [id]);

module.exports.deleteSignature = (id) =>
    db.query(`DELETE FROM signatures where user_id=$1`, [id]);
/*
 *
 * ___________________________________________________________________joins
 */
module.exports.getSigners = () =>
    db.query(
        `SELECT s.updated_at, u.id, u.first, u.last, p.age, p.city, p.pet, p.url FROM signatures AS s JOIN users AS u ON s.user_id=u.id JOIN profiles p ON u.id = p.user_id;`
    );
