<script>
    import FilterButton from "./Filter-button.svelte";
</script>


<section>
    <FilterButton
        text="All"
        match="all"
        dispatches="SHOW_ALL"
    />
    <FilterButton
        text="Active"
        match="active"
        dispatches="SHOW_ACTIVE"
    />
    <FilterButton
        text="Done"
        match="completed"
        dispatches="SHOW_COMPLETED"
    />
</section>