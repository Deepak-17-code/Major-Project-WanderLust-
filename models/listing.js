const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    // ✅ BACKWARD-COMPATIBLE IMAGE FIELD
    image: {
        url: {
            type: String,
            default:
                "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        },
        filename: {
            type: String,
            default: "default",
        },
    },

    price: {
        type: Number,
        min: 0,
    },

    location: {
        type: String,
        trim: true,
    },

    country: {
        type: String,
        trim: true,
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
{
    timestamps: true, // ✅ good practice
}
);

// ✅ SAFE CASCADE DELETE FOR REVIEWS
listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing && listing.reviews.length > 0) {
        await Review.deleteMany({
            _id: { $in: listing.reviews },
        });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
