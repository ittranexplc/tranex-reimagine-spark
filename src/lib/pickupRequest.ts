import { z } from "zod";
import { format, isMatch } from "date-fns";
import { nigerianStates, type NigerianState } from "@/data/nigerianStates";

export const itemTypes = ["documents", "parcel", "fragile", "bulky-freight", "other"] as const;
export type ItemType = (typeof itemTypes)[number];
export const itemTypeLabels: Record<ItemType, string> = {
  documents: "Documents",
  parcel: "Parcel / Package",
  fragile: "Fragile item",
  "bulky-freight": "Bulky cargo / Freight",
  other: "Other",
};

export const pickupTimes = ["morning", "afternoon", "evening", "any"] as const;
export type PickupTime = (typeof pickupTimes)[number];
export const pickupTimeLabels: Record<PickupTime, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  any: "Any time",
};

export const destinationTypes = ["nigeria", "international"] as const;
export type DestinationType = (typeof destinationTypes)[number];
export const destinationLabels: Record<DestinationType, string> = {
  nigeria: "Within Nigeria",
  international: "International",
};

export const DESCRIPTION_MIN_LENGTH = 3;
export const DESCRIPTION_MAX_LENGTH = 300;
export const INSTRUCTIONS_MAX_LENGTH = 300;
export const PACKAGE_COUNT_MAX = 999;

const DATE_FORMAT = "yyyy-MM-dd";

export const todayDateString = () => format(new Date(), DATE_FORMAT);

const stripPhone = (value: string) => value.replace(/[\s-]/g, "");
const isNigerianPhone = (value: string) => /^(0\d{10}|\+234\d{10})$/.test(stripPhone(value));
const isInternationalPhone = (value: string) => /^\+?\d{7,15}$/.test(value.replace(/[\s\-().]/g, ""));
const parseNumber = (value: string) => {
  const cleaned = value.replace(/,/g, "");
  return /^\d+(\.\d+)?$/.test(cleaned) ? Number(cleaned) : Number.NaN;
};
const isEmail = (value: string) => z.string().email().safeParse(value).success;
const oneOf = (options: readonly string[]) => (value: string) => options.includes(value);

const requiredText = (message: string) => z.string().trim().min(1, message);
const optionalText = () => z.string().trim();
const optionalPositiveNumber = (message: string) =>
  z
    .string()
    .trim()
    .refine((value) => value === "" || parseNumber(value) > 0, message);

const NIGERIAN_PHONE_MESSAGE = "Enter a Nigerian phone number, for example 0803 123 4567 or +234 803 123 4567.";

export const pickupRequestSchema = z
  .object({
    senderName: requiredText("Enter your full name."),
    senderPhone: requiredText("Enter your phone number.").refine(isNigerianPhone, NIGERIAN_PHONE_MESSAGE),
    senderEmail: requiredText("Enter your email address.").refine(
      isEmail,
      "Enter a valid email address, for example name@example.com.",
    ),
    pickupAddress: requiredText("Enter the pickup address."),
    pickupCity: requiredText("Enter the city or town."),
    pickupState: z.string().refine(oneOf(nigerianStates), "Choose the state."),
    pickupLandmark: optionalText(),

    receiverName: requiredText("Enter the receiver's full name."),
    receiverPhone: requiredText("Enter the receiver's phone number."),
    receiverEmail: optionalText().refine(
      (value) => value === "" || isEmail(value),
      "Enter a valid email address, for example name@example.com, or leave it empty.",
    ),
    destination: z.string().refine(oneOf(destinationTypes), "Choose where the shipment is going."),
    domesticAddress: optionalText(),
    domesticCity: optionalText(),
    domesticState: z.string(),
    internationalAddress: optionalText(),
    internationalCity: optionalText(),
    internationalCountry: optionalText(),

    itemType: z.string().refine(oneOf(itemTypes), "Choose the type of item."),
    packageCount: requiredText("Enter the number of packages.").refine(
      (value) => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= PACKAGE_COUNT_MAX,
      `Enter a whole number from 1 to ${PACKAGE_COUNT_MAX}.`,
    ),
    weightKg: requiredText("Enter the total weight in kg.").refine(
      (value) => parseNumber(value) > 0,
      "Enter a weight greater than 0, for example 2.5.",
    ),
    lengthCm: optionalPositiveNumber("Enter a length greater than 0, or leave it empty."),
    widthCm: optionalPositiveNumber("Enter a width greater than 0, or leave it empty."),
    heightCm: optionalPositiveNumber("Enter a height greater than 0, or leave it empty."),
    declaredValue: optionalText().refine(
      (value) => value === "" || parseNumber(value) >= 0,
      "Enter the value as a number, for example 10,000, or leave it empty.",
    ),
    description: z
      .string()
      .trim()
      .min(DESCRIPTION_MIN_LENGTH, `Describe the goods in at least ${DESCRIPTION_MIN_LENGTH} characters.`)
      .max(DESCRIPTION_MAX_LENGTH, `Keep the description to ${DESCRIPTION_MAX_LENGTH} characters or fewer.`),

    pickupDate: requiredText("Choose a pickup date.").refine(
      (value) => isMatch(value, DATE_FORMAT) && value >= todayDateString(),
      "Choose today or a later date.",
    ),
    pickupTime: z.string().refine(oneOf(pickupTimes), "Choose a preferred time."),
    specialInstructions: optionalText().refine(
      (value) => value.length <= INSTRUCTIONS_MAX_LENGTH,
      `Keep the instructions to ${INSTRUCTIONS_MAX_LENGTH} characters or fewer.`,
    ),
    consent: z.boolean().refine((value) => value, "Please confirm the details and agree to be contacted."),
  })
  .superRefine((values, ctx) => {
    const requireField = (path: string, valid: boolean, message: string) => {
      if (!valid) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });
    };

    if (values.destination === "nigeria") {
      if (values.receiverPhone !== "") {
        requireField("receiverPhone", isNigerianPhone(values.receiverPhone), NIGERIAN_PHONE_MESSAGE);
      }
      requireField("domesticAddress", values.domesticAddress !== "", "Enter the delivery address.");
      requireField("domesticCity", values.domesticCity !== "", "Enter the city or town.");
      requireField("domesticState", oneOf(nigerianStates)(values.domesticState), "Choose the state.");
    }

    if (values.destination === "international") {
      if (values.receiverPhone !== "") {
        requireField(
          "receiverPhone",
          isInternationalPhone(values.receiverPhone),
          "Enter the phone number with the country code, for example +44 20 7946 0000.",
        );
      }
      requireField("internationalAddress", values.internationalAddress !== "", "Enter the delivery address.");
      requireField("internationalCity", values.internationalCity !== "", "Enter the city.");
      requireField("internationalCountry", values.internationalCountry !== "", "Enter the country.");
    }
  });

export type PickupFormValues = z.infer<typeof pickupRequestSchema>;

export const pickupFormDefaults: PickupFormValues = {
  senderName: "",
  senderPhone: "",
  senderEmail: "",
  pickupAddress: "",
  pickupCity: "",
  pickupState: "",
  pickupLandmark: "",
  receiverName: "",
  receiverPhone: "",
  receiverEmail: "",
  destination: "nigeria",
  domesticAddress: "",
  domesticCity: "",
  domesticState: "",
  internationalAddress: "",
  internationalCity: "",
  internationalCountry: "",
  itemType: "",
  packageCount: "",
  weightKg: "",
  lengthCm: "",
  widthCm: "",
  heightCm: "",
  declaredValue: "",
  description: "",
  pickupDate: "",
  pickupTime: "",
  specialInstructions: "",
  consent: false,
};

export type PickupDestination =
  | { type: "nigeria"; address: string; city: string; state: NigerianState }
  | { type: "international"; address: string; city: string; country: string };

export type PickupRequestPayload = {
  sender: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: NigerianState;
    landmark: string | null;
  };
  receiver: {
    fullName: string;
    phone: string;
    email: string | null;
    destination: PickupDestination;
  };
  shipment: {
    itemType: ItemType;
    packageCount: number;
    weightKg: number;
    dimensionsCm: { length: number | null; width: number | null; height: number | null } | null;
    declaredValueNgn: number | null;
    description: string;
  };
  schedule: {
    preferredDate: string;
    preferredTime: PickupTime;
    specialInstructions: string | null;
  };
  consent: true;
};

const orNull = (value: string) => (value === "" ? null : value);
const numberOrNull = (value: string) => (value === "" ? null : parseNumber(value));
const toInternationalNigerianPhone = (value: string) => {
  const digits = stripPhone(value);
  return digits.startsWith("0") ? `+234${digits.slice(1)}` : digits;
};

export const toPickupRequestPayload = (values: PickupFormValues): PickupRequestPayload => {
  const dimensions = {
    length: numberOrNull(values.lengthCm),
    width: numberOrNull(values.widthCm),
    height: numberOrNull(values.heightCm),
  };
  const hasDimensions = Object.values(dimensions).some((value) => value !== null);
  const isDomestic = values.destination === "nigeria";

  return {
    sender: {
      fullName: values.senderName,
      phone: toInternationalNigerianPhone(values.senderPhone),
      email: values.senderEmail,
      address: values.pickupAddress,
      city: values.pickupCity,
      state: values.pickupState as NigerianState,
      landmark: orNull(values.pickupLandmark),
    },
    receiver: {
      fullName: values.receiverName,
      phone: isDomestic
        ? toInternationalNigerianPhone(values.receiverPhone)
        : values.receiverPhone.replace(/[\s\-().]/g, ""),
      email: orNull(values.receiverEmail),
      destination: isDomestic
        ? {
            type: "nigeria",
            address: values.domesticAddress,
            city: values.domesticCity,
            state: values.domesticState as NigerianState,
          }
        : {
            type: "international",
            address: values.internationalAddress,
            city: values.internationalCity,
            country: values.internationalCountry,
          },
    },
    shipment: {
      itemType: values.itemType as ItemType,
      packageCount: Number(values.packageCount),
      weightKg: parseNumber(values.weightKg),
      dimensionsCm: hasDimensions ? dimensions : null,
      declaredValueNgn: numberOrNull(values.declaredValue),
      description: values.description,
    },
    schedule: {
      preferredDate: values.pickupDate,
      preferredTime: values.pickupTime as PickupTime,
      specialInstructions: orNull(values.specialInstructions),
    },
    consent: true,
  };
};

export const submitPickupRequest = (payload: PickupRequestPayload): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, 900);
  });
