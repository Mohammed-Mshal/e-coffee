import mongoose, { Schema } from "mongoose";

export const reviewSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
});

// optional: static method to update product aggregates
reviewSchema.statics.updateProductStats = async function (productId: string) {
    const stats = await this.aggregate([
        {
            $match: {
                product: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            $group: {
                _id: "$product",
                avgRating: { $avg: "$rating" },
                count: { $sum: 1 }
            }
        }
    ]);
    if (stats.length > 0) {
        const { avgRating, count } = stats[0];
        await mongoose.model("Product").findByIdAndUpdate(productId, {
            averageRating: avgRating,
            reviewCount: count,
        });
    }
};

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);