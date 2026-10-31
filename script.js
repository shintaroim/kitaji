/**
 * きたじまのき プロトタイプ JavaScript
 * - タブ切り替え（研修プログラム）
 * - FAQ アコーディオン開閉
 * - 組織の悩み診断（チェックシート連動）
 * - お問い合わせフォーム タブ切り替え（相談／資料請求）
 * - フローティングCTAバーのスクロール連動表示
 * - モバイルメニューのトグル開閉
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. モバイルメニュートグル
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isDisplayed = mobileNav.style.display === 'block';
            mobileNav.style.display = isDisplayed ? 'none' : 'block';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.style.display = 'none';
            });
        });
    }

    // 2. 研修プログラム タブ切り替え
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 3. 組織の悩み診断チェック連動
    const diagCheckboxes = document.querySelectorAll('.diag-cb');
    const diagResult = document.getElementById('diagResult');

    diagCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('.diag-cb:checked').length;
            if (checkedCount >= 2) {
                diagResult.style.borderColor = '#DD6B20';
                diagResult.style.backgroundColor = '#FFF5EB';
            } else {
                diagResult.style.borderColor = '#FBD38D';
                diagResult.style.backgroundColor = '#FFFDF8';
            }
        });
    });

    // 4. FAQ アコーディオン
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // 全て閉じる
            faqItems.forEach(i => {
                i.classList.remove('active');
                const a = i.querySelector('.faq-answer');
                if (a) a.style.maxHeight = null;
            });

            // クリックされたものを開く（閉じるトグル）
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 5. お問い合わせフォーム タブ切り替え（相談 vs 資料請求）
    const formTabBtns = document.querySelectorAll('.form-tab-btn');
    const consultTypeGroup = document.getElementById('consultTypeGroup');
    const formSubmitBtn = document.querySelector('.btn-submit');

    formTabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            formTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const formType = btn.getAttribute('data-form');
            if (formType === 'doc') {
                if (consultTypeGroup) consultTypeGroup.style.display = 'none';
                if (formSubmitBtn) formSubmitBtn.textContent = '無料資料をダウンロードする（PDF）';
            } else {
                if (consultTypeGroup) consultTypeGroup.style.display = 'block';
                if (formSubmitBtn) formSubmitBtn.textContent = 'この内容で送信する（無料）';
            }
        });
    });

    // 6. フォーム送信シミュレーション
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
        });
    }

    // 7. フローティングCTAバー（スクロール600px以上で下部に表示）
    const floatingCta = document.getElementById('floatingCta');
    if (floatingCta) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }

    // 8. ナビゲーションのヘッダースムーズスクロールオフセット補正
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
