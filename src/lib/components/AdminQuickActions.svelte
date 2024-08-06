<script>
	import Button from './Button.svelte';
	import Link from './Link.svelte';

	async function logout() {
		await fetch('/login', {
			method: 'DELETE',
			credentials: 'include'
		});
		location.href = '/';
	}

	async function changePassword() {
		const _1 = prompt('Type new password');
		if (!_1) return;

		const _2 = prompt('Type new password again');
		if (!_2) return;
		if (_1 !== _2) {
			alert("Passwords don't match");
			changePassword();
			return;
		}

        await fetch('/login', {
			method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: _1 }),
			credentials: 'include'
		});
	}
</script>

<nav class="w-100 mb-5 text-center">
	<Link text="Dashboard" url="/cutiezone" />
	<Link text="New post" url="/cutiezone/new" />
	<Link text="Manage users" url="/cutiezone/users" />
    <Link text="Edit texts" url="/cutiezone/texts" />
	<Link text="Art" url="/cutiezone/art" />
	<Link text="Config" url="/cutiezone/config" />
	<Link text="IPs" url="/cutiezone/ips" />
	<Link text="Violations" url="/cutiezone/violations" />
	<Button text="Change password" callback={changePassword} />
	<Button text="Logout" callback={logout} />
</nav>
