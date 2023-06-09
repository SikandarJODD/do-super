<script lang="ts">
	import type { PageData } from './$types';
	import { postsData } from '../store';
	import DeleteLogo from '$lib/close.png';

	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data: PageData;
	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators: {
			title: (value) => (value.length < 3 ? 'Title Should be atleast 3 characters' : null),
			content: (value) => (value.length < 10 ? 'Content should be Minimum 10 Letters' : null)
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				postsData.update((value) => (value = [...value, form.data]));
			}
		},
		resetForm: true,
		invalidateAll: true
	});

	// Client Side Validation : validator is used

	// Using Postdata from '../store.js'
	$: posts = $postsData;

	// Update Data :
	let updateData = (text: string) => {
		console.log(text);
		postsData.update((val) => val.filter((id) => id.title != text));
	};
</script>

<SuperDebug data={$form} />
<h1>Welcome to SvelteKit</h1>
<div class="container">
	<form method="POST" use:enhance>
		<label for="title">Title of Card :</label>
		<input
			type="text"
			name="title"
			id="title"
			bind:value={$form.title}
			data-invalid={$errors.title}
			{...$constraints.title}
		/>
		{#if $errors.title}
			<span class="warning">{$errors.title}</span>
		{/if}

		<label for="content">Content :</label>
		<input
			type="text"
			name="content"
			id="content"
			bind:value={$form.content}
			data-invalid={$errors.content}
			{...$constraints.content}
		/>
		{#if $errors.content}
			<span class="warning">{$errors.content}</span>
		{/if}

		<button type="submit" class="outline">Submit</button>
	</form>
	<div class="box">
		{#each posts as item}
			<article class="box_small">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div>
					<img
						src={DeleteLogo}
						class="img_pos"
						alt="delete"
						on:click={() => updateData(item.title)}
					/>
				</div>
				<h4>{item.title}</h4>
				<div class="small_box">
					{item.content}
				</div>
			</article>
		{/each}
	</div>
</div>

<style>
	form {
		width: 40%;
		border: 2px solid rgb(130, 127, 127);
		border-radius: 6px;
		padding: 20px 25px;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	}
	button {
		width: fit-content;
		margin: 10px auto;
	}
	label {
		font-weight: bold;
		color: rgb(18, 198, 253);
	}
	.outline:hover {
		background: rgba(18, 198, 253, 0.888);
		color: white;
	}
	input {
		height: 2.6rem;
		border: 1px solid rgba(12, 240, 122, 0.767);
		background: #5c575721;
	}
	.warning {
		color: rgb(250, 34, 34);
	}

	/* Output Card Design */
	.box {
		display: flex;
		flex-wrap: wrap;
	}
	.box_small {
		position: relative;
		width: fit-content;
		border: 1px solid black;
		background: lightcyan;
		transition: all 0.3s ease;
		box-shadow: none;
		padding: 20px 50px 20px 20px;
		margin: 10px;
	}
	.box_small:hover {
		box-shadow: 6px 6px rgba(0, 14, 40, 0.895);
		transition: all 0.3s ease;
		transform: translate(-7px, -7px) !important;
	}
	.small_box {
		color: rgb(37, 34, 34);
	}
	.box_small h4 {
		margin: 5px 0;
		text-transform: uppercase;
		color: rgba(0, 10, 50, 0.893);
	}
	.img_pos {
		position: absolute;
		width: 40px;
		top: 5px;
		right: 5px;
	}
	@media (max-width: 768px) {
		form {
			width: 100%;
		}
	}
</style>
