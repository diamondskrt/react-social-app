import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { SignInValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import Logo from "@/components/shared/logo";

export default function SigninForm() {
  const navigate = useNavigate();
  
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (user: z.infer<typeof SignInValidation>) => {
    const session = await signInAccount(user);

    if (!session) {
      toast.error("Login failed. Please try again.");
      
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col">
        <Logo />

        <h5 className="pt-5 sm:pt-12">
          Log in to your account
        </h5>
        <p className="text-muted-foreground mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isPending || isUserLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}