// Global Chart.js settings
Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
Chart.defaults.font.size = 14;
Chart.defaults.color = '#374151';

// Color palette
const colors = {
    primary: '#0FA3B1',
    secondary: '#F39C12',
    dark: '#111827',
    gray: '#374151',
    light: '#f8fafc',
    success: '#059669',
    warning: '#F39C12',
    danger: '#dc2626'
};

// Chart data
const chartData = {
    ondeProcuram: {
        labels: ['Indicação', 'Google', 'WhatsApp', 'Facebook', 'OLX', 'GetNinjas', 'Instagram', 'Parcerias'],
        data: [50, 25, 10, 6, 3, 3, 2, 1],
        colors: ['#0FA3B1', '#F39C12', '#059669', '#3b82f6', '#8b5cf6', '#ef4444', '#ec4899', '#6b7280']
    },
    confianca: {
        labels: ['Indicação', 'WhatsApp', 'Parcerias', 'Google', 'Facebook', 'Marketplaces', 'Instagram', 'OLX'],
        data: [10, 9, 9, 8, 7, 6, 6, 5],
        colors: ['#0FA3B1', '#059669', '#6b7280', '#F39C12', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444']
    },
    conversao: {
        labels: ['Indicação', 'WhatsApp', 'Parcerias', 'GetNinjas', 'Google', 'Facebook', 'OLX', 'Instagram'],
        data: [35, 30, 25, 20, 20, 15, 12.5, 12.5],
        colors: ['#0FA3B1', '#059669', '#6b7280', '#ef4444', '#F39C12', '#3b82f6', '#8b5cf6', '#ec4899']
    },
    cpl: {
        labels: ['Indicação', 'WhatsApp', 'Parcerias', 'Facebook', 'Instagram', 'OLX', 'Google', 'GetNinjas'],
        data: [5, 5, 5, 10, 20, 20, 25, 35],
        colors: ['#059669', '#059669', '#059669', '#F39C12', '#F39C12', '#F39C12', '#ef4444', '#ef4444']
    },
    budgetSolo: {
        labels: ['Google Meu Negócio', 'Redes Sociais', 'WhatsApp Business', 'Comunidades Locais', 'Reserva Emergencial'],
        data: [30, 35, 20, 10, 5],
        colors: ['#0FA3B1', '#3b82f6', '#059669', '#F39C12', '#6b7280']
    },
    budgetGrowth: {
        labels: ['Anúncios Pagos', 'Redes Sociais', 'GMB + SEO', 'Site/Landing', 'Reserva Emergencial'],
        data: [25, 35, 20, 10, 10],
        colors: ['#ef4444', '#3b82f6', '#0FA3B1', '#8b5cf6', '#6b7280']
    },
    budgetDominance: {
        labels: ['Anúncios Pagos', 'Redes Sociais', 'SEO Avançado', 'CRM/Automação', 'Reserva Emergencial'],
        data: [50, 25, 15, 5, 5],
        colors: ['#ef4444', '#3b82f6', '#0FA3B1', '#ec4899', '#6b7280']
    },
    setupCosts: {
        labels: ['Site Profissional', 'Setup GMB', 'Logo + Kit Visual'],
        data: [1500, 300, 600],
        ranges: ['R$ 500 - 3.000', 'R$ 200 - 500', 'R$ 300 - 1.000'],
        colors: ['#0FA3B1', '#F39C12', '#8b5cf6']
    },
    funil: {
        labels: ['Leads Totais', 'Leads Qualificados', 'Visitas Agendadas', 'Propostas Enviadas', 'Fechamentos', 'Obras Concluídas'],
        data: [100, 50, 45, 45, 10, 9],
        colors: ['#0FA3B1', '#3b82f6', '#059669', '#F39C12', '#ef4444', '#8b5cf6']
    }
};

// Function to create a horizontal bar chart
function createHorizontalBarChart(canvasId, data, title) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: title,
                data: data.data,
                backgroundColor: data.colors,
                borderColor: data.colors,
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: colors.dark,
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: colors.primary,
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            const suffix = canvasId.includes('cpl') ? ' R$' : '%';
                            return `${context.parsed.x}${suffix}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: '#e5e7eb',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            const suffix = canvasId.includes('cpl') ? 'R$' : '%';
                            return value + suffix;
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Function to create a pie chart
function createPieChart(canvasId, data, title) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: data.colors,
                borderColor: '#fff',
                borderWidth: 2,
                hoverBorderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: colors.dark,
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: colors.primary,
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            cutout: '60%',
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Function to create a vertical bar chart (setup costs)
function createVerticalBarChart(canvasId, data, title) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Value (R$)',
                data: data.data,
                backgroundColor: data.colors,
                borderColor: data.colors,
                borderWidth: 1,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: colors.dark,
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: colors.primary,
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            const range = data.ranges[context.dataIndex];
                            return [`R$ ${context.parsed.y.toLocaleString('pt-BR')}`, `Range: ${range}`];
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 45,
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e5e7eb',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Function to create the funnel chart
function createFunnelChart(canvasId, data, title) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Quantity',
                data: data.data,
                backgroundColor: data.colors,
                borderColor: data.colors,
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: colors.dark,
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: colors.primary,
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} units`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 45,
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 110,
                    grid: {
                        color: '#e5e7eb',
                        drawBorder: false
                    },
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Function to initialize all charts
function initializeCharts() {
    // Wait for the DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCharts);
        return;
    }

    // Horizontal bar charts
    createHorizontalBarChart('onde-procuram-chart', chartData.ondeProcuram, 'Where Customers Look First (%)');
    createHorizontalBarChart('confianca-chart', chartData.confianca, 'Trust Level by Channel (1-10)');
    createHorizontalBarChart('conversao-chart', chartData.conversao, 'Conversion Rate by Channel (%)');
    createHorizontalBarChart('cpl-chart', chartData.cpl, 'Cost Per Lead (R$)');

    // Pie charts for budgets
    createPieChart('budget-solo-chart', chartData.budgetSolo, 'Solo Starter');
    createPieChart('budget-growth-chart', chartData.budgetGrowth, 'Growth Accelerator');
    createPieChart('budget-dominance-chart', chartData.budgetDominance, 'Dominance');

    // One-time setup costs chart
    createVerticalBarChart('setup-costs-chart', chartData.setupCosts, 'One-Time Setup Costs');

    // Sales funnel chart
    createFunnelChart('funil-chart', chartData.funil, 'Sales Funnel');
}

// Function to handle window resize
function handleResize() {
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.resize();
    });
}

// Event listeners
window.addEventListener('resize', handleResize);

// Initialize charts
// initializeCharts();

