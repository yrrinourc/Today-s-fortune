document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const fortuneText = document.getElementById('fortune-text');
    const artCanvas = document.getElementById('art-canvas');
    const currentDateElement = document.getElementById('current-date');
    const ctx = artCanvas.getContext('2d');

    const fortunes = [
        {
            message: "大吉！今日は素晴らしい一日になりそう。新しい挑戦が吉と出るでしょう。",
            mood: "positive"
        },
        {
            message: "吉。まずまずの日。計画通りに進めば問題ありません。",
            mood: "neutral"
        },
        {
            message: "中吉。少しだけ良いことがありそう。小さな幸せを見つけてみて。",
            mood: "neutral"
        },
        {
            message: "小吉。現状維持が大切。焦らず、着実に。",
            mood: "neutral"
        },
        {
            message: "末吉。油断は禁物。慎重な行動を心がけて。",
            mood: "negative"
        },
        {
            message: "凶。今日は用心の日。大きな決断は避けるのが賢明です。",
            mood: "negative"
        },
        {
            message: "大凶...かと思いきや、実は最高の転機かも？ピンチはチャンス！",
            mood: "positive"
        }
    ];

    // キャンバスサイズを親要素に合わせて調整
    function resizeCanvas() {
        const display = document.querySelector('.fortune-display');
        artCanvas.width = display.clientWidth;
        artCanvas.height = display.clientHeight;
    }

    // 運勢に応じた抽象アートを生成
    function generateAbstractArt(mood) {
        ctx.clearRect(0, 0, artCanvas.width, artCanvas.height);

        let colors = [];
        if (mood === "positive") {
            colors = ["#ff7e5f", "#feb47b", "#86a8e7", "#91eae4", "#a1c4fd", "#c2e9fb"];
        } else if (mood === "negative") {
            colors = ["#4b0082", "#2e0854", "#6a5acd", "#7b68ee", "#5f9ea0", "#4682b4"];
        } else {
            colors = ["#a8dadc", "#457b9d", "#1d3557", "#f1faee", "#e63946", "#add8e6"];
        }

        const numShapes = Math.floor(Math.random() * 10) + 5;

        for (let i = 0; i < numShapes; i++) {
            const shapeType = Math.random();
            const x = Math.random() * artCanvas.width;
            const y = Math.random() * artCanvas.height;
            const size = Math.random() * 100 + 30;

            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.globalAlpha = Math.random() * 0.5 + 0.3;

            ctx.beginPath();
            if (shapeType < 0.33) {
                ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            } else if (shapeType < 0.66) {
                ctx.rect(x - size / 2, y - size / 2, size, size);
            } else {
                ctx.moveTo(x, y - size / 2);
                ctx.lineTo(x + size / 2, y + size / 2);
                ctx.lineTo(x - size / 2, y + size / 2);
                ctx.closePath();
            }
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    // 現在の日付を表示
    function displayCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][now.getDay()];
        currentDateElement.textContent = `${year}年${month}月${day}日 (${dayOfWeek})`;
    }

    // ボタンクリックで運勢表示＋アート生成＋日付更新
    generateButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        const selectedFortune = fortunes[randomIndex];

        fortuneText.textContent = selectedFortune.message;
        generateAbstractArt(selectedFortune.mood);
        displayCurrentDate();
    });

    // 初期状態の設定
    resizeCanvas();
    generateAbstractArt("neutral");
    displayCurrentDate();
    window.addEventListener('resize', resizeCanvas);

    // PWA Service Worker の登録
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => {
                console.log('✅ Service Worker registered:', reg.scope);
            })
            .catch(err => {
                console.warn('⚠️ Service Worker registration failed:', err);
            });
    }
});
