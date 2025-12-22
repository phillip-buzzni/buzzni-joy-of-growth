export function getPrincipleImage(id) {
    const imageMap = {
        'customer-delight': 'customer-delight.png',
        'mission-over-individual': 'mission-over-individual.png',
        'aim-higher': 'aim-higher.png',
        'focus-on-impact': 'focus-on-impact.png',
        'question-assumptions': 'question-assumptions.png',
        'execution-over-perfection': 'execution-over-perfection.png',
        'move-with-agility': 'move-with-agility.png', 
        'ask-for-feedback': 'ask-for-feedback.png',
        'learn-proactively': 'learn-proactively.png'
    };
    return `/images/principles/${imageMap[id] || 'customer-delight.png'}`;
}
