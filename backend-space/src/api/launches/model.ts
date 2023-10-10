import mongoose, { Schema, Document } from 'mongoose';

export interface ILaunches extends Document {
    name: String,
    fairings: Object,
    links: Object,
    static_fire_date_utc: String,
    static_fire_date_unix: String,
    net: String,
    window: String,
    rocket: Object,
    success: Boolean,
    failures: Schema.Types.Mixed,
    details: String,
    crew: [Object],
    ships: [Object],
    capsules: [Object],
    payloads: [String],
    launchpad: String,
    flight_number: Number,
    date_utc: Number,
    date_unix: Number,
    date_local: Date
    date_precision: String,
    upcoming: Boolean,
    cores: [Object],
    auto_update: Boolean,
    tbd: Boolean,
    launch_library_id: String,
    launch_id: String
    view: (bool?: boolean) => any
}

const launchesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fairings: {
      type: {},
      default: null,
    },
    links: {
      type: Object,
    },
    static_fire_date_utc: {
      type: String,
      default: null,
    },
    static_fire_date_unix: {
      type: String,
      default: null,
    },
    net: {
      type: String,
      default: null,
    },
    window: {
      type: String,
      default: null,
    },
    rocket: {
      type: Object,
      default: null,
    },
    success: {
      type: Boolean,
      default: null,
    },
    failures: {
      type: Schema.Types.Mixed,
      default: null,
    },
    details: {
      type: String,
      default: null,
    },
    crew: {
      type: [Object],
      default: [],
    },
    ships: {
      type: [Object],
      default: [],
    },
    capsules: {
      type: [Object],
      default: [],
    },
    payloads: {
      type: [String],
      default: [],
    },
    launchpad: {
      type: String,
      default: null,
    },
    flight_number: {
      type: Number,
      default: null,
    },
    date_utc: {
      type: Date,
      default: null,
    },
    date_unix: {
      type: Number,
      default: null,
    },
    date_local: {
      type: Date,
      default: null,
    },
    date_precision: {
      type: String,
      default: null,
    },
    upcoming: {
      type: Boolean,
      default: null,
    },
    cores: {
      type: [Object],
      default: [],
    },
    auto_update: {
      type: Boolean,
      default: null,
    },
    tbd: {
      type: Boolean,
      default: null,
    },
    launch_library_id: {
      type: String,
      default: null,
    },
    launch_id: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  }
);

launchesSchema.methods = {
    view(full: boolean = false) {
        const view = {
            // simple view
            id: this.id,
            name: this.name,
            static_fire_date_utc: this.static_fire_date_utc,
            static_fire_date_unix: this.static_fire_date_unix,
            net: this.net,
            fairings: this.fairings,
            links: this.links,
            window: this.window,
            rocket: this.rocket,
            success: this.success,
            failures: this.failures,
            details: this.details,
            crew: this.crew,
            ships: this.ships,
            capsules: this.capsules,
            payloads: this.payloads,
            launchpad: this.launchpad,
            flight_number: this.flight_number,
            date_utc: this.date_utc,
            date_unix: this.date_unix,
            date_local: this.date_local,
            date_precision: this.date_precision,
            upcoming: this.upcoming,
            cores: this.cores,
            auto_update: this.auto_update,
            tbd: this.tbd,
            launch_library_id: this.launch_library_id,
            launch_id: this.launch_id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

    return full ? { ...view } : view;
  },
};

const model = mongoose.model<ILaunches>('launches', launchesSchema);

export const schema = model.schema;
export default model;
