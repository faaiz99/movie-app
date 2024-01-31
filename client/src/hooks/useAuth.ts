// import { useQuery, useMutation } from "@tanstack/react-query";
// import { authenticationUser, registerUser } from "../services/api";

// export function useAuthenticationUser({ email, password}) {
// 	return useQuery({
// 		refetchOnWindowFocus: false,
// 		queryKey: ["authentication-user"],
// 		queryFn: () => authenticationUser({ email, password}),
// 	});
// }
// export function useRegisterUser() {
// 	return useQuery({
// 		refetchOnWindowFocus: false,
// 		queryKey: ["register-user"],
// 		queryFn: ()=>registerUser(),
// 	});
// }