import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const addAddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pinCode: z.string().min(1, "Pin code is required"), // Keeping as string
});

export type AddAddressInput = TypeOf<typeof addAddressSchema>;

interface AddAddressFormProps {
  onSubmit: SubmitHandler<AddAddressInput>; // Prop to handle form submission
  initialValues?: AddAddressInput | null; // Prop to pre-fill form on edit
}

const AddAddressForm = ({ onSubmit, initialValues }: AddAddressFormProps) => {
  const form = useForm<AddAddressInput>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: initialValues || {
      // Use initialValues for editing
      street: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // Reset form on successful submission
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)} // Handle submission
        className="text-brown text-xl font-semibold"
      >
        <FormItem>
          <FormLabel className="flex flex-row font-semibold">
            Street:
            <FormMessage className="ml-3 font-medium" />
          </FormLabel>
          <FormControl>
            <Input {...form.register("street")} placeholder="123 Main St" />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel className="flex flex-row font-semibold">
            City:
            <FormMessage className="ml-3 font-medium" />
          </FormLabel>
          <FormControl>
            <Input {...form.register("city")} placeholder="New York" />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel className="flex flex-row font-semibold">
            State:
            <FormMessage className="ml-3 font-medium" />
          </FormLabel>
          <FormControl>
            <Input {...form.register("state")} placeholder="California" />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel className="flex flex-row font-semibold">
            Country:
            <FormMessage className="ml-3 font-medium" />
          </FormLabel>
          <FormControl>
            <Input {...form.register("country")} placeholder="USA" />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel className="flex flex-row font-semibold">
            Pin Code:
            <FormMessage className="ml-3 font-medium" />
          </FormLabel>
          <FormControl>
            <Input {...form.register("pinCode")} placeholder="123456" />
          </FormControl>
        </FormItem>
        <Button className="w-full mb-3" type="submit">
          Add Address
        </Button>
      </form>
    </Form>
  );
};

export default AddAddressForm;
