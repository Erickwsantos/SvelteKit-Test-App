<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { get } from 'svelte/store';

	let name = '';
	let timeout;
	let loading = false;

	$: name = $page.url.searchParams.get('name') ?? '';

	function handleInput(event) {
		const nameValue = event.target.value;

		if (nameValue.trim() === '') return;
		loading = true;
		clearTimeout(timeout);
		if (nameValue.trim() !== '') {
			timeout = setTimeout(() => {
				const params = new URLSearchParams(get(page).url.searchParams);
				params.set('name', nameValue);
				goto(`/?${params.toString()}`, { replaceState: true, keepfocus: true, noScroll: true });
			}, 700);
			setTimeout(() => {
				console.log('Resultados');
				loading = false;
			}, 1000);
		} else {
			timeout = setTimeout(() => {
				const params = new URLSearchParams(get(page).url.searchParams);
				params.delete('name');
				goto(`/?${params.toString()}`, { replaceState: true, keepfocus: true, noScroll: true });
			}, 700);
			setTimeout(() => {
				loading = false;
			}, 1000);

		}
	}

	onDestroy(() => {
		clearTimeout(timeout);
	});
	export let data;
	console.log(data.resultado);
</script>
<div class="container">
	{#if loading}
		<span>Buscando...</span>
	{/if}
	{#if name.trim() === '' && !loading}
		<span>Digite um nome para buscar!</span>
	{:else if name && !data.resultado && !loading}
		<span>Nenhum resultado encontrado!</span>
	{:else if data.resultado && !loading}
		<span>Resultado encontrado!</span>
	{/if}

	<div class="inputContainer">
		<input
			class="inputContent"
			type="text"
			placeholder="Digite um nome..."
			on:input={handleInput}
			bind:value={name}
			autocomplete="off"
		/>
	</div>

	{#if data.resultado && !loading}

		<div class="DetailContainer">
			<p>Nome: {data.resultado.name}</p>
			<p>Idade estimada: {data.resultado.age}</p>
			<p>Quantidade de registros: {data.resultado.count}</p>
		</div>
	{/if}
</div>

<style>
    .container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        flex-direction: column;
        background: radial-gradient(#f4fff4, #70b479);

        span {
            position: absolute;
            color: #308434;
						text-decoration-color: #802a3e;
						/*border: 1px solid #2a802e;*/
            margin-top: -450px;
            font-size: 2rem;
            font-weight: 600;
            text-align: center;
            width: 100%;
            z-index: 1;
        }

        .inputContainer {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 20px;
            justify-content: center;
            gap: 10px;

            .inputContent {
                width: 300px;
                padding: 10px;
                border: 1px solid #2a802e;
                border-radius: 6px;
                background: #f4fff4;

                &&:focus {
                    outline: none;
                    border-color: #308434;
                }
            }
        }

        .DetailContainer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #2a802e;
            border-radius: 6px;
            background: linear-gradient(#c3f3c6, #458a49);
            width: 300px;
            box-shadow: 1px 1px 8px #2a802e;

            p {
                margin: 0;
                font-size: 16px;
                color: #ffffff;
            }
        }

    }
</style>
