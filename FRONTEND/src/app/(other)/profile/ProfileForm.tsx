import React, { useEffect } from "react";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, z } from "zod";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/schema/schema";

// Validation schemas
const nameSchema = z.object({
  name: z.string().min(1, "Full name is required").max(100),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

const addressSchema = z.object({
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pinCode: z
      .number()
      .positive("PinCode must be positive")
      .min(10000, "PinCode must have 5 digits")
      .max(999999, "PinCode must have at most 6 digits"),
  }),
});

export type NameInput = TypeOf<typeof nameSchema>;
export type PasswordInput = TypeOf<typeof passwordSchema>;
export type AddressInput = TypeOf<typeof addressSchema>;

const ProfileForm = ({ user }: { user: userSchema }) => {
  // Separate forms
  const nameForm = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: user.name || "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: user.address[0] || {
        street: "",
        city: "",
        state: "",
        country: "",
        pinCode: undefined,
      },
    },
  });

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Update Successful!",
        variant: "default",
        duration: 2000,
      });
    }

    if (isError) {
      toast({
        title: "Update Failed",
        description: `${error}`,
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [isSuccess, isError]);

  const handleNameUpdate: SubmitHandler<NameInput> = (values) => {
    updateUser({ name: values.name });
  };

  const handlePasswordUpdate: SubmitHandler<PasswordInput> = (values) => {
    updateUser({ password: values.password });
  };

  const handleAddressUpdate: SubmitHandler<AddressInput> = (values) => {
    updateUser({ address: values.address });
  };

  return (
    <div className="space-y-6">
      {/* Name Update Form */}
      <Form {...nameForm}>
        <form onSubmit={nameForm.handleSubmit(handleNameUpdate)}>
          <FormField
            control={nameForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-50" type="submit" disabled={isLoading}>
            {isLoading ? "Updating Name..." : "Update Name"}
          </Button>
        </form>
      </Form>

      {/* Password Update Form */}
      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)}>
          <FormField
            control={passwordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password:</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating Password..." : "Update Password"}
          </Button>
        </form>
      </Form>

      {/* Address Update Form */}
      <Form {...addressForm}>
        <form onSubmit={addressForm.handleSubmit(handleAddressUpdate)}>
          <FormField
            control={addressForm.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="123 Main St" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="City Name" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="address.state"
            render={({ field }) => (
              <FormItem className="my-3">
                <FormLabel>State:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="State Name" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="address.country"
            render={({ field }) => (
              <FormItem className="my-3">
                <FormLabel>Country:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Country Name" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="address.pinCode"
            render={({ field }) => (
              <FormItem className="my-3">
                <FormLabel>Pin Code:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="123456"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Add other address fields */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating Address..." : "Update Address"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
