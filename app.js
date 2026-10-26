// JavaScript logic for mathiesonmoller.com (Interactive & Flirty Edition)

// Configured valid codes and corresponding greetings
const INVITE_CONFIGS = {
    'COAST26': "Hey! I was thinking coffee and a walk along the south coast would be great. Here's a bit more about me.",
    'CBD26': "Hey! Cozy drinks in town sounded like a good vibe. Here's a bit more about me.",
    'DLR26': "Hey! A wildcard date sounds exciting. Let's see what we pick. Here's a bit more about me.",
    'GUEST26': "Hey there, great meeting you. I'm glad we crossed paths.",
    'INVITE26': "Hey there, great meeting you. I'm glad we connected.",
    'DATE26': "Hey! Glad we crossed paths. Here's a bit more about me."
};

// Date Compiler State
let dateState = { beverage: null, backdrop: null, timing: null };
let dateLabels = { beverage: null, backdrop: null, timing: null };

// Chemistry Calculator State
let calcState = { bill: null, vibe: null };

// Elements
const lockScreenSection = document.getElementById('lock-screen-section');
const decryptScreen = document.getElementById('decrypt-screen');
const terminalContent = document.getElementById('terminal-content');
const profileScreen = document.getElementById('profile-screen');
const inviteCodeInput = document.getElementById('invite-code');
const errorMessage = document.getElementById('error-message');
const unlockBtn = document.getElementById('unlock-btn');
const welcomeGreeting = document.getElementById('welcome-greeting');
const ctaContainer = document.getElementById('cta-container');
const smsLiveBubble = document.getElementById('sms-live-bubble');

// Keypress listener for 'Enter' key in code input
inviteCodeInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        validateCode();
    }
});

// Event listener for unlock button
unlockBtn.addEventListener('click', validateCode);

// On Page Load: Check for 'code' query parameter in the URL (e.g. mathiesonmoller.com?code=COAST26)
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    
    if (codeFromUrl) {
        const cleanCode = codeFromUrl.trim().toUpperCase();
        if (INVITE_CONFIGS.hasOwnProperty(cleanCode)) {
            inviteCodeInput.value = cleanCode;
            validateCode();
        }
    }
});

// Code validation logic
function validateCode() {
    const inputCode = inviteCodeInput.value.trim().toUpperCase();
    
    if (INVITE_CONFIGS.hasOwnProperty(inputCode)) {
        startDecryption(INVITE_CONFIGS[inputCode], inputCode);
    } else if (inputCode === "ADMIN123" || inputCode === "TEST") {
        startDecryption(INVITE_CONFIGS['GUEST26'], "TEST_OVERRIDE");
    } else {
        errorMessage.classList.remove('hidden');
        inviteCodeInput.classList.add('border-rose-500', 'focus:ring-rose-500', 'focus:border-rose-500');
        lockScreenSection.classList.add('animate-shake');
        setTimeout(() => {
            lockScreenSection.classList.remove('animate-shake');
        }, 500);
    }
}

// Start terminal decrypt scan sequence
function startDecryption(greetingText, code) {
    // Hide lock screen
    lockScreenSection.classList.add('hidden');
    
    // Show terminal
    decryptScreen.classList.remove('hidden');
    
    const logs = [
        `> INITIALIZING DECRYPTION PROTOCOL...`,
        `> KEY DETECTED: [${code}]`,
        `> COMPILING GUEST DIRECTORY...`,
        `> WARNING: HIGH CHEMISTRY POTENTIAL DETECTED.`,
        `> DECRYPTING DOSSIER... [100%]`,
        `> ACCESS GRANTED. UNLOCKING DECK.`
    ];
    
    logs.forEach((log, index) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.textContent = log;
            terminalContent.appendChild(p);
        }, index * 250);
    });
    
    // Transition to main app interface
    setTimeout(() => {
        decryptScreen.classList.add('hidden');
        unlockProfile(greetingText);
    }, logs.length * 270 + 200);
}

// Reveal profile screen animation
function unlockProfile(greetingText) {
    welcomeGreeting.textContent = `"${greetingText}"`;
    document.body.classList.remove('justify-center');
    profileScreen.classList.remove('hidden');
    profileScreen.offsetHeight; // Force reflow
    profileScreen.classList.add('opacity-100', 'translate-y-0');
    profileScreen.classList.remove('opacity-0', 'translate-y-8');
}

// Interactive Spec Sheet toggles
function showStatDetails(index) {
    const detailParagraph = document.getElementById(`stat-detail-${index}`);
    if (detailParagraph.classList.contains('hidden')) {
        detailParagraph.classList.remove('hidden');
        detailParagraph.classList.add('animate-fade-in');
    } else {
        detailParagraph.classList.add('hidden');
    }
}

// FAQ Accordion Toggle function
function toggleFAQ(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    
    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    } else {
        answer.classList.add('hidden');
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }
}

// Chemistry Calc buttons setting
function setCalc(type, val) {
    calcState[type] = val;
    
    // Reset active buttons in the row
    const buttons = type === 'bill' ? ['me', 'split'] : ['fun', 'vfun'];
    buttons.forEach(b => {
        const btn = document.getElementById(`calc-${type}-${b}`);
        if (btn) btn.classList.remove('active');
    });
    
    // Set active button
    const targetBtn = document.getElementById(`calc-${type}-${val}`);
    if (targetBtn) targetBtn.classList.add('active');
}

// Run animated chemistry match scan
function runChemistryCalc() {
    if (!calcState.bill || !calcState.vibe) {
        alert("Please complete both questions first to run the scan!");
        return;
    }
    
    const resultBox = document.getElementById('calc-result');
    const percentEl = document.getElementById('calc-percentage');
    
    resultBox.classList.remove('hidden');
    
    // Animate count-up to 98.7
    let current = 0.0;
    const target = 98.7;
    const interval = setInterval(() => {
        current += 4.5;
        if (current >= target) {
            percentEl.textContent = target.toFixed(1);
            clearInterval(interval);
        } else {
            percentEl.textContent = current.toFixed(1);
        }
    }, 40);
}

// Interactive Date Builder logic
function setParam(type, btnSuffix, textLabel) {
    dateState[type] = btnSuffix;
    dateLabels[type] = textLabel;
    
    let btnPrefix = "";
    if (type === 'beverage') btnPrefix = 'bev';
    if (type === 'backdrop') btnPrefix = 'back';
    if (type === 'timing') btnPrefix = 'time';
    
    const siblingSuffixes = ['a', 'b', 'c', 'd'];
    siblingSuffixes.forEach(s => {
        const btn = document.getElementById(`${btnPrefix}-${s}`);
        if (btn) btn.classList.remove('active');
    });
    
    const targetBtn = document.getElementById(`${btnPrefix}-${btnSuffix}`);
    if (targetBtn) targetBtn.classList.add('active');
    
    updateSMSBubble();
}

// Recompile SMS live text bubble
function updateSMSBubble() {
    const bev = dateLabels.beverage;
    const back = dateLabels.backdrop;
    const time = dateLabels.timing;
    
    if (bev && back && time) {
        smsLiveBubble.textContent = `Hey Mathieson, the card worked! Down for a ${bev} and a ${back} on ${time}. Let's do it.`;
        
        ctaContainer.classList.remove('hidden');
        setTimeout(() => {
            ctaContainer.classList.remove('opacity-0', 'scale-95');
            ctaContainer.classList.add('opacity-100', 'scale-100');
        }, 50);
    } else {
        let missing = [];
        if (!bev) missing.push("Step 1 (Fuel)");
        if (!back) missing.push("Step 2 (Backdrop)");
        if (!time) missing.push("Step 3 (Timing)");
        
        smsLiveBubble.textContent = `Configure ${missing.join(', ')} to compile your date proposal...`;
        ctaContainer.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            ctaContainer.classList.add('hidden');
        }, 300);
    }
}

// SMS Link Dispatcher
function sendSMS() {
    const bev = dateLabels.beverage;
    const back = dateLabels.backdrop;
    const time = dateLabels.timing;
    
    if (!bev || !back || !time) return;
    
    const phoneNumber = "021560236";
    const smsBody = `Hey Mathieson, the card worked! Down for a ${bev} and a ${back} on ${time}. Let's do it.`;
    const encodedBody = encodeURIComponent(smsBody);
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                  
    const separator = isIOS ? '&' : '?';
    const smsUrl = `sms:${phoneNumber}${separator}body=${encodedBody}`;
    
    window.location.href = smsUrl;
}
