import { supabase } from "./client";

async function signUp(email: string, username: string, password: string) {
	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
				username: username,
			},
		},
	});

	return { data, error };
}

async function login(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	return { data, error };
}
