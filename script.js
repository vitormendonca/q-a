const inpcheckboxes = document.querySelectorAll('input[type=checkbox]');
let resultpercentage = 0;

const answers = [
    document.querySelectorAll('.answersq1'),
    document.querySelectorAll('.answersq2'),
    document.querySelectorAll('.answersq3'),
    document.querySelectorAll('.answersq4')
];

answers.forEach(answerssec => {
    answerssec.forEach(answer => {
        answer.addEventListener('click', e => {
            // Toggle 'selected' class on clicked answer
            answer.classList.add('selected');
            answer.children[0].checked = true;
            // Remove 'selected' class from other answers in the same question
            const otheranswers = Array.from(answerssec).filter(item => item !== answer);
            otheranswers.forEach(otheranswer => {
                otheranswer.classList.remove('selected');
                otheranswer.style.backgroundColor = "white"; 
                const checkbox = otheranswer.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox.checked) {
                    checkbox.checked = false; // Remove 'checked' state
                }
            });
            answer.style.backgroundColor = answer.classList.contains('selected') ? "lightblue" : "white";
            // Calculate result percentage if the answer is correct and not already scored
            if (answer.classList.contains('correctopt') && !answer.classList.contains('somado')) {
                resultpercentage += 25;
                answer.classList.add('somado'); // Mark as scored to prevent multiple scoring
            }
        });
    });
});

const submitbtn = document.getElementById('submitbtn');
const showdiv = document.getElementById('showresult');
    
let output = 0;

submitbtn.addEventListener('click', () => {
    showdiv.classList.remove('d-none');

    scrollTo({ top: 0});

    const timer = setInterval(() => {
        showdiv.querySelector("span").textContent = `You are ${output}% Ninja`; // Changed 'result' to 'showdiv'
        if (output === resultpercentage) { // Changed 'score' to 'resultpercentage'
            clearInterval(timer);
        } else {
            output++;
        }
    }, 50);
});
