const dmyTwoDigitFormat = (dateString) => {
    if (!dateString) return '';

    const [y, m, d] = dateString.split('T')[0].split('-');
    return `${d}-${m}-${y.slice(-2)}`;
};

export { dmyTwoDigitFormat }