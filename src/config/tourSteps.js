const isMobile = window.innerWidth < 640;

const bigScreenContent = 'Filter by state. Click any of the state listed to view COVID-19 epi-curve of the selected state. Click "All" to view the overall epi-curve in Nigeria(Default).';
const mobileScreenContent = 'Click this button to Open sidebar, you can filter by state from here. Click any of the state listed to view COVID-19 epi-curve of the selected state. Click "All" to view the overall epi-curve in Nigeria(Default).';

export default [
    {
        selector: '.night-mode-toggle',
        content: 'Use this button to switch between dark and light mode.',
    },
    {
        selector: !isMobile ? '.datatable' : '.mobile-menu',
        content: !isMobile ? bigScreenContent : mobileScreenContent,
    },
    {
        selector: '.stats',
        content: "This section shows the cumulative confirm, active, recovered and death cases overtime. This figures will be updated based on the selected state.",
    },
    {
        selector: '.perday',
        content: "The line chart on this tab shows how the figures are changing each day since the first reported case. This figures will be updated based on the selected state.",
    },
    {
        selector: '.cumulative',
        content: "This section shows the cumulative figure overtime. This figures will be updated based on the selected state.",
    }
];
