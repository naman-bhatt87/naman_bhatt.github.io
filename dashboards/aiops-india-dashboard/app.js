// Dashboard Application Logic
class AIOpsMLOpsDashboard {
    constructor() {
        this.data = {
            adoption_stats: {
                ai_adoption_india: 59,
                agentic_ai_exploration: 80,
                mlops_usage: 39,
                pilot_to_production: 56,
                financial_firms_genai: 74
            },
            market_data: {
                global_mlops_2024: 3.24,
                global_mlops_2033: 8.68,
                mlops_cagr: 12.31,
                global_aiops_2024: 11.7,
                global_aiops_2028: 32.4,
                aiops_cagr: 22.7,
                india_ai_market_2025: 10.15,
                india_ai_market_2034: 45.72,
                india_ai_cagr: 18.2
            },
            sector_adoption: {
                bfsi: 82,
                healthcare: 76,
                manufacturing: 64,
                retail_cpg: 75,
                it_services: 85,
                telecommunications: 78
            },
            regional_data: {
                metros: 75,
                tier2_cities: 45,
                tier3_cities: 25
            },
            trends: [
                {year: 2020, ai_adoption: 40, mlops_maturity: 15},
                {year: 2021, ai_adoption: 45, mlops_maturity: 22},
                {year: 2022, ai_adoption: 56, mlops_maturity: 31},
                {year: 2023, ai_adoption: 59, mlops_maturity: 39},
                {year: 2024, ai_adoption: 67, mlops_maturity: 48},
                {year: 2025, ai_adoption: 74, mlops_maturity: 58}
            ]
        };
        
        this.charts = {};
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.createCharts();
    }

    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(`${targetTab}-tab`).classList.add('active');
                
                // Refresh charts when tab becomes visible
                setTimeout(() => {
                    Object.values(this.charts).forEach(chart => {
                        if (chart && typeof chart.resize === 'function') {
                            chart.resize();
                        }
                    });
                }, 100);
            });
        });
    }

    createCharts() {
        this.createTrendsChart();
        this.createSectorChart();
        this.createMLOpsMarketChart();
        this.createAIOpsMarketChart();
        this.createRegionalChart();
    }

    createTrendsChart() {
        const ctx = document.getElementById('trendsChart');
        if (!ctx) return;

        const years = this.data.trends.map(item => item.year);
        const aiAdoption = this.data.trends.map(item => item.ai_adoption);
        const mlopsMaturity = this.data.trends.map(item => item.mlops_maturity);

        this.charts.trends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'AI Adoption (%)',
                        data: aiAdoption,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'MLOps Maturity (%)',
                        data: mlopsMaturity,
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    createSectorChart() {
        const ctx = document.getElementById('sectorChart');
        if (!ctx) return;

        const sectors = ['BFSI', 'IT Services', 'Telecom', 'Healthcare', 'Retail & CPG', 'Manufacturing'];
        const adoptionRates = [
            this.data.sector_adoption.bfsi,
            this.data.sector_adoption.it_services,
            this.data.sector_adoption.telecommunications,
            this.data.sector_adoption.healthcare,
            this.data.sector_adoption.retail_cpg,
            this.data.sector_adoption.manufacturing
        ];

        this.charts.sector = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sectors,
                datasets: [{
                    label: 'Adoption Rate (%)',
                    data: adoptionRates,
                    backgroundColor: [
                        '#1FB8CD',
                        '#FFC185',
                        '#B4413C',
                        '#ECEBD5',
                        '#5D878F',
                        '#DB4545'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }

    createMLOpsMarketChart() {
        const ctx = document.getElementById('mlopsMarketChart');
        if (!ctx) return;

        const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033'];
        const startValue = this.data.market_data.global_mlops_2024;
        const endValue = this.data.market_data.global_mlops_2033;
        const cagr = this.data.market_data.mlops_cagr / 100;

        // Calculate intermediate values using CAGR
        const values = years.map((year, index) => {
            return startValue * Math.pow(1 + cagr, index);
        });

        this.charts.mlopsMarket = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Market Size ($B)',
                    data: values,
                    backgroundColor: '#1FB8CD',
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `CAGR: ${this.data.market_data.mlops_cagr}%`
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(1) + 'B';
                            }
                        }
                    }
                }
            }
        });
    }

    createAIOpsMarketChart() {
        const ctx = document.getElementById('aiopsMarketChart');
        if (!ctx) return;

        const years = ['2024', '2025', '2026', '2027', '2028'];
        const startValue = this.data.market_data.global_aiops_2024;
        const endValue = this.data.market_data.global_aiops_2028;
        const cagr = this.data.market_data.aiops_cagr / 100;

        // Calculate intermediate values using CAGR
        const values = years.map((year, index) => {
            return startValue * Math.pow(1 + cagr, index);
        });

        this.charts.aiopsMarket = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Market Size ($B)',
                    data: values,
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.2)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#FFC185',
                    pointBorderColor: '#FFC185',
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `CAGR: ${this.data.market_data.aiops_cagr}%`
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(1) + 'B';
                            }
                        }
                    }
                }
            }
        });
    }

    createRegionalChart() {
        const ctx = document.getElementById('regionalChart');
        if (!ctx) return;

        const regions = ['Metro Cities', 'Tier-2 Cities', 'Tier-3 Cities'];
        const adoptionRates = [
            this.data.regional_data.metros,
            this.data.regional_data.tier2_cities,
            this.data.regional_data.tier3_cities
        ];

        this.charts.regional = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: regions,
                datasets: [{
                    data: adoptionRates,
                    backgroundColor: [
                        '#1FB8CD',
                        '#FFC185',
                        '#B4413C'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIOpsMLOpsDashboard();
});

// Add interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to metric items
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.backgroundColor = 'var(--color-secondary)';
            setTimeout(() => {
                item.style.backgroundColor = '';
            }, 200);
        });
    });

    // Add progressive loading animation for severity bars
    const severityBars = document.querySelectorAll('.severity-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    });

    severityBars.forEach(bar => {
        observer.observe(bar);
    });
});

// Add smooth scrolling for tab navigation on mobile
document.addEventListener('DOMContentLoaded', () => {
    const tabNavigation = document.querySelector('.tab-navigation');
    if (tabNavigation) {
        tabNavigation.style.scrollBehavior = 'smooth';
    }
});

// Handle window resize for chart responsiveness
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Charts will auto-resize due to responsive: true option
    }, 250);
});