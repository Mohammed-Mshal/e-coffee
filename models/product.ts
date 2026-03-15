import { IProductDocument } from "@/types/product.types";
import mongoose, { Document, Schema } from "mongoose";

export const productSchema = new Schema<IProductDocument>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxLength: [100, 'Name cannot exceed 100 characters']
    },
    description: {
        type: String,
        default: "",
        maxLength: [2000, 'Description cannot exceed 2000 characters']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
    }],
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
    },
    averageRating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot exceed 5'],
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: [0, 'Review count cannot be negative'],
    },
    images: {
        type: [String],
        validate: {
            validator: (images: string[]) => images.length <= 10,
            message: 'Max number of images is 10'
        }
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

productSchema.virtual('isInStock').get(function (this: IProductDocument) {
    return this.stock > 0;
});
productSchema.index({ name: 'text', description: 'text' })
productSchema.index({ price: 1 })
productSchema.index({ category: 1 })
productSchema.index({ status: 1 })
productSchema.index({ averageRating: -1 })
productSchema.index({ createdAt: -1 })
productSchema.index({ slug: 1 }, { unique: true })

productSchema.pre('save', async function (this: IProductDocument) {
    if (this.isModified('name')) {
        this.slug = this.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .trim();
    }
})

export const Product = mongoose.models.Product || mongoose.model<IProductDocument>("Product", productSchema);