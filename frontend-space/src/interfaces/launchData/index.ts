interface LaunchData {
  id: string;
  net: string;
  name: string;
  static_fire_date_utc: string;
  static_fire_date_unix: string;
  fairings: {
    ships: [];
    reused: boolean;
    recovered: boolean;
    recovery_attempt: boolean;
  } | null;
  links: {
    patch: {
      small: string;
      large: string;
    };
    reddit: {
      launch: string;
      media: string | null;
      campaign: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    webcast: string;
    article: string;
    presskit: string;
    wikipedia: string;
    youtube_id: string;
  };
  window: string;
  rocket: {
    height: {
      feet: number;
      meters: number;
    };
    diameter: {
      feet: number;
      meters: number;
    };
    mass: {
      lb: number;
      kg: number;
    };
    first_stage: {
      thrust_sea_level: {
        kN: number;
        lbf: number;
      };
      thrust_vacuum: {
        kN: number;
        lbf: number;
      };
      engines: number;
      reusable: boolean;
      burn_time_sec: number;
      fuel_amount_tons: number;
    };
    second_stage: {
      thrust: {
        kN: number;
        lbf: number;
      };
      payloads: {
        composite_fairing: {
          option_1: string;
          height: {
            feet: number;
            meters: number;
          };
          diameter: {
            feet: number;
            meters: number;
          };
        };
      };
      engines: number;
      reusable: boolean;
      burn_time_sec: number;
      fuel_amount_tons: number;
    };
    engines: {
      isp: {
        vacuum: number;
        sea_level: number;
      };
      thrust_sea_level: {
        kN: number;
        lbf: number;
      };
      thrust_vacuum: {
        kN: number;
        lbf: number;
      };
      type: string;
      number: number;
      layout: string;
      version: string;
      propellant_1: string;
      propellant_2: string;
      engine_loss_max: number;
      thrust_to_weight: number;
    };
    landing_legs: {
      number: number;
      material: string;
    };
    payload_weights: {
      id: string;
      kg: number;
      lb: number;
      name: string;
    }[];
    id: string;
    name: string;
    type: string;
    stages: number;
    active: boolean;
    country: string;
    company: string;
    boosters: number;
    wikipedia: string;
    description: string;
    first_flight: string;
    flickr_images: string[];
    cost_per_launch: number;
    success_rate_pct: number;
  };
  crew: any[];
  success: boolean;
  details: string;
  ships: string[];
  date_utc: string;
  capsules: string[];
  launchpad: string;
  date_unix: number;
  payloads: string[];
  upcoming: boolean;
  date_local: string;
  flight_number: number;
  date_precision: string;
  failures: {
    time: number;
    reason: string;
    altitude: number;
  }[];
  cores: {
    core: string;
    legs: boolean;
    flight: number;
    reused: boolean;
    landpad: string;
    gridfins: boolean;
    landing_type: string;
    landing_attempt: boolean;
    landing_success: boolean;
  }[];
  tbd: boolean;
  launch_id: string;
  auto_update: boolean;
  launch_library_id: string | null;
}

export default LaunchData;
