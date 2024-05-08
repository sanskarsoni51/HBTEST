"use client";
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
import { useEffect } from "react";
import { toast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/store";
import { addAddress } from "@/redux/slice/orderSlice";
// import { useAddAddressMutation } from "@/redux/api/cartApi";

const addAddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pinCode: z.string().min(1, "Pin code is required"), // Assuming pin code is a 6-digit number
});

export type AddAddressInput = TypeOf<typeof addAddressSchema>;

const AddAddressForm = () => {
  //   const [addAddress, { isLoading, isSuccess, isError, error }] =
  // useAddAddressMutation();
  const form = useForm<z.infer<typeof addAddressSchema>>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
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

  //   useEffect(() => {
  //     if (isSuccess) {
  //       toast({
  //         title: "Add address Successful!",
  //         variant: "default",
  //         duration: 2000,
  //       });
  //     }

  //     if (isError) {
  //       if (error) {
  //         toast({
  //           title: "Add Address Failed",
  //           description: `${error}`,
  //           variant: "destructive",
  //           duration: 2000,
  //         });
  //       } else {
  //         toast({
  //           title: "Network Error. Please try again.",
  //           variant: "destructive",
  //           duration: 2000,
  //         });
  //       }
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const dispatch = useAppDispatch();

  const SubmitAddress: SubmitHandler<TypeOf<typeof addAddressSchema>> = (
    data,
  ) => {
    // Call the addAddress mutation with the form data
    dispatch(addAddress(data));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(SubmitAddress)}
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
