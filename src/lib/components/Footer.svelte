<script lang="ts">
	// Just put the copyright year as a parameter - normally we would have more state or no parameters
	interface Props {
		year?: string | null;
	}

	const { year }: Props = $props();
</script>

<!-- We would put normal footer stuff here like links etc. Here we will just put legal notice. -->
<footer>&copy; {year}. All Rights Reserved.</footer>

<style>
	footer {
		padding-top: 3em;
		text-align: center;
		color: #ddd;
	}
</style>
