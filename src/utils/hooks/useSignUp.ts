import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { User } from "./useUser";
import { ResponseError } from "../errors";
import { QUERY_KEY } from "../constants";

async function signUp(email: string, password: string): Promise<User> {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok)
    throw new ResponseError("Failed on sign up request", response);

  return await response.json();
}

type IUseSignUp = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export function useSignUp(): IUseSignUp {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: signUpMutation } = useMutation<
    User,
    unknown,
    { email: string; password: string },
    unknown
  >(({ email, password }) => signUp(email, password), {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data);
      navigate("/");
    },
    onError: () => {
      enqueueSnackbar("Ops.. Error on sign up. Try again!", {
        variant: "error",
      });
    },
  });

  return signUpMutation;
}

/** 用法
 * 
 * const signUp = useSignUp();

  const onSignUp: FormEventHandler<HTMLFormElement> = (form) => {
    form.preventDefault();
    const formData = new FormData(form.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email === 'string' && typeof password === 'string') {
      signUp({
        email,
        password
      });
    }
  }
 * 
 * 
 */
