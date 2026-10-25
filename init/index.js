const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
console.log(dbUrl);

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    // await Listing.deleteMany({});
    
    const listings = initData.data.map((listing) => ({
        ...listing,
        owner: "6adcc0646cf3b9051b7e511c",
        image: {
            filename: listing.image.filename,
            url: listing.image.url
        }
    }));

    await Listing.insertMany(listings);

    console.log("data was initialized...");
};

initDB();
