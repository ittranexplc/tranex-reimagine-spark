import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  ConsentField,
  FormSection,
  RadioField,
  SelectField,
  TextAreaField,
  TextField,
  type FieldOption,
} from "@/components/pickup/PickupFormFields";
import { PickupAnnounceContext } from "@/components/pickup/usePickupRevalidate";
import { contactDetails } from "@/data/contactInfo";
import { nigerianStates } from "@/data/nigerianStates";
import {
  DESCRIPTION_MAX_LENGTH,
  INSTRUCTIONS_MAX_LENGTH,
  destinationLabels,
  destinationTypes,
  itemTypeLabels,
  itemTypes,
  pickupFormDefaults,
  pickupRequestSchema,
  pickupTimeLabels,
  pickupTimes,
  submitPickupRequest,
  toPickupRequestPayload,
  todayDateString,
  type PickupFormValues,
} from "@/lib/pickupRequest";

const toOptions = <T extends string>(values: readonly T[], labels: Record<T, string>): FieldOption[] =>
  values.map((value) => ({ value, label: labels[value] }));

const stateOptions: FieldOption[] = nigerianStates.map((state) => ({ value: state, label: state }));
const destinationOptions = toOptions(destinationTypes, destinationLabels);
const itemTypeOptions = toOptions(itemTypes, itemTypeLabels);
const pickupTimeOptions = toOptions(pickupTimes, pickupTimeLabels);

const SIZE_CAPTION_CLASS = "text-xs font-normal text-muted-foreground";
const CONSENT_TEXT = "I confirm that the details above are correct and agree to be contacted about this pickup.";

type PendingFocus = "success" | "first-field" | null;

const RequestPickup = () => {
  const form = useForm<PickupFormValues>({
    resolver: zodResolver(pickupRequestSchema),
    defaultValues: pickupFormDefaults,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });
  const { submitCount, isSubmitting, errors } = form.formState;
  const destination = useWatch({ control: form.control, name: "destination" });
  const reduceMotion = useReducedMotion();

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [pendingFocus, setPendingFocus] = useState<PendingFocus>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const sendingRef = useRef(false);

  const announce = useCallback((message: string) => {
    setAnnouncement("");
    window.setTimeout(() => setAnnouncement(message), 50);
  }, []);

  const scrollBehavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

  useEffect(() => {
    if (submitCount === 0 || !formRef.current) return;
    const invalid = formRef.current.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!invalid) return;
    const target =
      invalid.getAttribute("role") === "radiogroup"
        ? invalid.querySelector<HTMLElement>('[role="radio"][data-state="checked"]') ??
          invalid.querySelector<HTMLElement>('[role="radio"]')
        : invalid;
    if (!target) return;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "center", behavior: scrollBehavior });
  }, [submitCount, scrollBehavior]);

  useEffect(() => {
    if (pendingFocus === "success" && submitted) {
      successHeadingRef.current?.focus({ preventScroll: true });
      successHeadingRef.current?.scrollIntoView({ block: "center", behavior: scrollBehavior });
      setPendingFocus(null);
    }
    if (pendingFocus === "first-field" && !submitted) {
      const first = formRef.current?.querySelector<HTMLElement>("input, textarea, button");
      first?.focus({ preventScroll: true });
      first?.scrollIntoView({ block: "center", behavior: scrollBehavior });
      setPendingFocus(null);
    }
  }, [pendingFocus, submitted, scrollBehavior]);

  const onValid = async (values: PickupFormValues) => {
    if (sendingRef.current) return;
    sendingRef.current = true;
    setSubmitError(false);
    try {
      await submitPickupRequest(toPickupRequestPayload(values));
      setSubmitted(true);
      setPendingFocus("success");
    } catch {
      setSubmitError(true);
    } finally {
      sendingRef.current = false;
    }
  };

  const onInvalid = (fieldErrors: FieldErrors<PickupFormValues>) => {
    const count = Object.keys(fieldErrors).length;
    announce(
      `Your request has not been sent. ${count} ${count === 1 ? "field needs" : "fields need"} attention. Please correct the highlighted ${count === 1 ? "field" : "fields"}.`,
    );
  };

  const startAnotherRequest = () => {
    form.reset(pickupFormDefaults);
    setSubmitError(false);
    setSubmitted(false);
    setPendingFocus("first-field");
  };

  const hasErrors = submitCount > 0 && Object.keys(errors).length > 0;

  return (
    <Layout>
      <MotionConfig reducedMotion="user">
        <PageHeader
          title="Request a Pickup"
          subtitle="Tell us what to collect and where it is going, and our team will contact you to confirm."
        />

        <section className="bg-muted py-12 md:py-20">
          <div className="container mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl border border-border bg-card p-8 text-center sm:p-12"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-9 w-9 text-primary" aria-hidden="true" />
                  </div>
                  <h2
                    ref={successHeadingRef}
                    tabIndex={-1}
                    className="mb-3 font-heading text-2xl font-bold text-foreground focus:outline-none md:text-3xl"
                  >
                    Pickup request submitted
                  </h2>
                  <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                    Thank you. Our team will contact you shortly to confirm your pickup.
                  </p>
                  <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Button
                      type="button"
                      onClick={startAnotherRequest}
                      className="h-12 rounded-lg bg-secondary px-8 font-semibold text-secondary-foreground hover:bg-orange-dark"
                    >
                      Submit another request
                    </Button>
                    <Link
                      to="/"
                      className="inline-flex h-12 items-center justify-center rounded-lg border border-primary px-8 font-semibold text-primary ring-offset-background transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Back to the home page
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <PickupAnnounceContext.Provider value={announce}>
                  <Form {...form}>
                    <form
                      ref={formRef}
                      noValidate
                      aria-label="Pickup request"
                      aria-busy={isSubmitting}
                      onSubmit={form.handleSubmit(onValid, onInvalid)}
                      className="space-y-6"
                    >
                      <FormSection step={1} title="Sender (pickup) details">
                        <TextField
                          name="senderName"
                          label="Full name"
                          required
                          autoComplete="name"
                          placeholder="Chinedu Okafor"
                          className="md:col-span-2"
                        />
                        <TextField
                          name="senderPhone"
                          label="Phone number"
                          required
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="0803 123 4567"
                        />
                        <TextField
                          name="senderEmail"
                          label="Email"
                          required
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="name@example.com"
                        />
                        <TextField
                          name="pickupAddress"
                          label="Pickup address"
                          required
                          autoComplete="street-address"
                          placeholder="12 Allen Avenue"
                          className="md:col-span-2"
                        />
                        <TextField
                          name="pickupCity"
                          label="City / Town"
                          required
                          autoComplete="address-level2"
                          placeholder="Ikeja"
                        />
                        <SelectField
                          name="pickupState"
                          label="State"
                          required
                          placeholder="Select state"
                          options={stateOptions}
                        />
                        <TextField
                          name="pickupLandmark"
                          label="Nearest landmark"
                          autoComplete="off"
                          placeholder="Opposite Ikeja City Mall"
                          className="md:col-span-2"
                        />
                      </FormSection>

                      <FormSection step={2} title="Receiver (delivery) details">
                        <TextField
                          name="receiverName"
                          label="Receiver's name"
                          required
                          autoComplete="off"
                          placeholder="Amina Bello"
                          className="md:col-span-2"
                        />
                        <TextField
                          name="receiverPhone"
                          label="Receiver's phone"
                          required
                          type="tel"
                          inputMode="tel"
                          autoComplete="off"
                          placeholder={destination === "international" ? "+44 20 7946 0000" : "0805 987 6543"}
                        />
                        <TextField
                          name="receiverEmail"
                          label="Receiver's email"
                          type="email"
                          inputMode="email"
                          autoComplete="off"
                          placeholder="name@example.com"
                        />
                        <RadioField
                          name="destination"
                          label="Destination"
                          required
                          options={destinationOptions}
                          className="md:col-span-2"
                          optionsClassName="sm:grid-cols-2"
                        />
                        {destination === "international" ? (
                          <>
                            <TextField
                              key="internationalAddress"
                              name="internationalAddress"
                              label="Delivery address"
                              required
                              autoComplete="off"
                              placeholder="221 Oxford Street"
                              className="md:col-span-2"
                            />
                            <TextField
                              key="internationalCity"
                              name="internationalCity"
                              label="City"
                              required
                              autoComplete="off"
                              placeholder="London"
                            />
                            <TextField
                              key="internationalCountry"
                              name="internationalCountry"
                              label="Country"
                              required
                              autoComplete="off"
                              placeholder="United Kingdom"
                            />
                          </>
                        ) : (
                          <>
                            <TextField
                              key="domesticAddress"
                              name="domesticAddress"
                              label="Delivery address"
                              required
                              autoComplete="off"
                              placeholder="5 Aminu Kano Crescent, Wuse 2"
                              className="md:col-span-2"
                            />
                            <TextField
                              key="domesticCity"
                              name="domesticCity"
                              label="City / Town"
                              required
                              autoComplete="off"
                              placeholder="Abuja"
                            />
                            <SelectField
                              key="domesticState"
                              name="domesticState"
                              label="State"
                              required
                              placeholder="Select state"
                              options={stateOptions}
                            />
                          </>
                        )}
                      </FormSection>

                      <FormSection step={3} title="Shipment details">
                        <SelectField
                          name="itemType"
                          label="Item type"
                          required
                          placeholder="Select item type"
                          options={itemTypeOptions}
                        />
                        <TextField
                          name="packageCount"
                          label="Number of packages"
                          required
                          inputMode="numeric"
                          autoComplete="off"
                          maxLength={3}
                          placeholder="1"
                        />
                        <TextField
                          name="weightKg"
                          label="Total weight (kg)"
                          required
                          inputMode="decimal"
                          autoComplete="off"
                          placeholder="2.5"
                        />
                        <TextField
                          name="declaredValue"
                          label="Declared value (₦)"
                          inputMode="numeric"
                          autoComplete="off"
                          placeholder="10,000"
                        />
                        <fieldset className="min-w-0 md:col-span-2">
                          <legend className="float-left mb-3 w-full text-sm font-medium leading-none">
                            Package size (cm)
                          </legend>
                          <div className="clear-left grid grid-cols-3 gap-3">
                            <TextField
                              name="lengthCm"
                              label="Length"
                              aria-label="Package length in cm"
                              labelClassName={SIZE_CAPTION_CLASS}
                              inputMode="decimal"
                              autoComplete="off"
                              placeholder="5"
                            />
                            <TextField
                              name="widthCm"
                              label="Width"
                              aria-label="Package width in cm"
                              labelClassName={SIZE_CAPTION_CLASS}
                              inputMode="decimal"
                              autoComplete="off"
                              placeholder="5"
                            />
                            <TextField
                              name="heightCm"
                              label="Height"
                              aria-label="Package height in cm"
                              labelClassName={SIZE_CAPTION_CLASS}
                              inputMode="decimal"
                              autoComplete="off"
                              placeholder="5"
                            />
                          </div>
                        </fieldset>
                        <TextAreaField
                          name="description"
                          label="Description of goods"
                          required
                          maxLength={DESCRIPTION_MAX_LENGTH}
                          placeholder="2 cartons of books"
                          className="md:col-span-2"
                        />
                      </FormSection>

                      <FormSection step={4} title="Pickup schedule and notes">
                        <TextField
                          name="pickupDate"
                          label="Pickup date"
                          required
                          type="date"
                          min={todayDateString()}
                          autoComplete="off"
                        />
                        <SelectField
                          name="pickupTime"
                          label="Pickup time"
                          required
                          placeholder="Select time"
                          options={pickupTimeOptions}
                        />
                        <TextAreaField
                          name="specialInstructions"
                          label="Special instructions"
                          maxLength={INSTRUCTIONS_MAX_LENGTH}
                          placeholder="Please call before arriving"
                          className="md:col-span-2"
                        />
                        <ConsentField label={CONSENT_TEXT} className="md:col-span-2" />
                      </FormSection>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm">
                          {hasErrors && (
                            <p className="font-medium text-destructive">
                              Your request has not been sent. Please correct the highlighted fields above.
                            </p>
                          )}
                          {submitError && (
                            <p role="alert" className="font-medium text-destructive">
                              Sorry, your request could not be sent. Please try again or call Customer Care.
                            </p>
                          )}
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-12 w-full shrink-0 rounded-lg bg-secondary px-8 text-base font-semibold text-secondary-foreground hover:bg-orange-dark sm:w-auto"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                              Submitting…
                            </>
                          ) : (
                            "Submit Pickup Request"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </PickupAnnounceContext.Provider>
              )}
            </div>

            <aside
              aria-labelledby="pickup-help-heading"
              className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-[125px]"
            >
              <h2 id="pickup-help-heading" className="mb-1 font-heading text-lg font-bold text-foreground">
                Need help?
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">Our Customer Care team can help with your pickup.</p>
              <ul className="space-y-3">
                {contactDetails.map((item) => (
                  <li key={item.title} className="flex min-h-11 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                      <item.icon className="h-5 w-5 text-secondary" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-semibold text-foreground">{item.title}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="break-words text-sm text-muted-foreground transition-colors hover:text-secondary"
                        >
                          {item.info}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{item.info}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {announcement}
        </div>
      </MotionConfig>
    </Layout>
  );
};

export default RequestPickup;
