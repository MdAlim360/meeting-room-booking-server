import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this.query.searchTerm as string;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });
        }
        return this;
    }

    filter() {
        const { capacity, pricePerSlot, roomId, date } = this.query;

        const filters: Record<string, unknown> = {
            isBooked: { $ne: true }, // Exclude booked slots
        };

        // Apply specific filters if they exist
        if (pricePerSlot) filters.pricePerSlot = pricePerSlot;
        if (capacity) filters.capacity = capacity;
        if (roomId) filters.room = roomId;
        if (date) filters.date = date;

        // Apply all filters together
        this.modelQuery = this.modelQuery.find(filters);

        return this;
    }

    sort() {
        const sort = (this.query.sort as string)?.split(',')?.join(' ') || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);
        return this;
    }
}

export default QueryBuilder;
