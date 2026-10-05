/**
 * شِ هيلثي | Shi Healthy - Interactive Logic & Subscription Flow
 * Handles tabs, multi-step checkout modal (Flow B), filters, accordion, and lead form.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Data Store: Plans & Meals
  // ==========================================
  const plansData = {
    // Monthly Plans
    'plan-m-3': {
      id: 'plan-m-3',
      type: 'monthly',
      title: '3 وجبات يوميًا',
      mealsTotal: 78,
      price: 260,
      priceFormatted: '260 دينار / شهريًا',
      breakdown: { chicken: 48, beef: 15, fish: 15 },
      breakdownText: '48 وجبة دجاج • 15 وجبة لحمة • 15 وجبة سمك'
    },
    'plan-m-2': {
      id: 'plan-m-2',
      type: 'monthly',
      title: 'وجبتين يوميًا (الأكثر طلبًا)',
      mealsTotal: 52,
      price: 175,
      priceFormatted: '175 دينار / شهريًا',
      breakdown: { chicken: 32, beef: 10, fish: 10 },
      breakdownText: '32 وجبة دجاج • 10 وجبات لحمة • 10 وجبات سمك'
    },
    'plan-m-1': {
      id: 'plan-m-1',
      type: 'monthly',
      title: 'وجبة يوميًا',
      mealsTotal: 26,
      price: 90,
      priceFormatted: '90 دينار / شهريًا',
      breakdown: { chicken: 16, beef: 5, fish: 5 },
      breakdownText: '16 وجبة دجاج • 5 وجبات لحمة • 5 وجبات سمك'
    },
    'plan-m-chicken': {
      id: 'plan-m-chicken',
      type: 'monthly',
      title: 'اشتراك الدجاج',
      mealsTotal: 26,
      price: 75,
      priceFormatted: '75 دينار / شهريًا',
      breakdown: { chicken: 26, beef: 0, fish: 0 },
      breakdownText: '26 وجبة دجاج متنوعة'
    },
    'plan-m-salad': {
      id: 'plan-m-salad',
      type: 'monthly',
      title: 'اشتراك السلطات',
      mealsTotal: 26,
      price: 55,
      priceFormatted: '55 دينار / شهريًا',
      breakdown: { salad: 26 },
      breakdownText: '26 سلطة حجم كبير مع بروتين'
    },
    // Weekly Plans
    'plan-w-14': {
      id: 'plan-w-14',
      type: 'weekly',
      title: '14 وجبة أسبوعية',
      mealsTotal: 14,
      price: 65,
      priceFormatted: '65 دينار / أسبوعيًا',
      breakdown: { chicken: 8, beef: 3, fish: 3 },
      breakdownText: '8 وجبات دجاج • 3 وجبات لحمة • 3 وجبات سمك'
    },
    'plan-w-7': {
      id: 'plan-w-7',
      type: 'weekly',
      title: '7 وجبات أسبوعية',
      mealsTotal: 7,
      price: 35,
      priceFormatted: '35 دينار / أسبوعيًا',
      breakdown: { chicken: 5, beef: 1, fish: 1 },
      breakdownText: '5 وجبات دجاج • 1 وجبة لحمة • 1 وجبة سمك'
    }
  };

  // Real Shi Healthy Meals from Menu
  const mealsList = [
    { id: 'm1', name: 'دجاج مشوي بالأعشاب', type: 'chicken', cal: 420, protein: 36, carbs: 32, desc: 'صدر دجاج مشوي مع كينوا وخضار مشوية سوتيه' },
    { id: 'm2', name: 'دجاج ترياكي صحي', type: 'chicken', cal: 430, protein: 35, carbs: 38, desc: 'صلصة ترياكي دايت، سمسم، فلفل رومي، بروكلي وأرز أسمر' },
    { id: 'm3', name: 'دجاج بصلصة الفطر والكريمة الصحية', type: 'chicken', cal: 440, protein: 38, carbs: 28, desc: 'صوص فطر طازج خفيف، بارميزان خفيفة الدسم' },
    { id: 'm4', name: 'دجاج مسالا هندي صحي', type: 'chicken', cal: 410, protein: 35, carbs: 34, desc: 'بهارات مسالا مع كوسا وجزر وفلفل حلو' },
    { id: 'm5', name: 'دجاج كاري خضار', type: 'chicken', cal: 425, protein: 36, carbs: 36, desc: 'صوص كاري صحي مع بطاطا وجزر وفليفلة ملونة' },
    { id: 'm6', name: 'دجاج مكسيكي حار', type: 'chicken', cal: 415, protein: 36, carbs: 30, desc: 'صلصة مكسيكية مع فلفل هالبينو وذرة وفاصوليا حمراء' },
    { id: 'm7', name: 'دجاج سيزلنج مع جبن قليل الدسم', type: 'chicken', cal: 450, protein: 39, carbs: 29, desc: 'بصل وفلفل وذرة وموزاريلا لايت' },
    { id: 'm8', name: 'ستيك لحم بقر مشوي مع بروكلي', type: 'beef', cal: 460, protein: 38, carbs: 25, desc: 'لحم بقري صافي مع كوسا وجزر وبروكلي' },
    { id: 'm9', name: 'كفتة لحم مشوية مع أرز بني', type: 'beef', cal: 480, protein: 34, carbs: 35, desc: 'كفتة مشوية بهارات شِ هيلثي مع طماطم مشوية' },
    { id: 'm10', name: 'بيف ستروجانوف دايت', type: 'beef', cal: 470, protein: 37, carbs: 30, desc: 'صلصة ستروجانوف صحية مع فطر وبصل' },
    { id: 'm11', name: 'كرات لحم بصلصة الطحينية', type: 'beef', cal: 490, protein: 35, carbs: 32, desc: 'كرات لحم متبلة مع صوص طحينية خفيف وبطاطا مشوية' },
    { id: 'm12', name: 'سلمون مشوي بالليمون والأعشاب', type: 'fish', cal: 520, protein: 40, carbs: 22, desc: 'فيليه سلمون نرويجي طازج مع بطاطا حلوة وبروكلي' },
    { id: 'm13', name: 'جمبري سويت تشيلي صحي', type: 'fish', cal: 380, protein: 32, carbs: 28, desc: 'جمبري مشوي مع بروكلي وفلفل ملون صوص خفيف' },
    { id: 'm14', name: 'فيليه سمك مع طحينية وهالبينو', type: 'fish', cal: 400, protein: 36, carbs: 24, desc: 'فيليه سمك أبيض خفيف مع صلصة طحينة صحية' },
    { id: 'm15', name: 'سلطة كينوا مع أفوكادو وحلوم', type: 'salad', cal: 350, protein: 22, carbs: 28, desc: 'جرجير، كينوا، جبنة حلوم مشوية لايت، أفوكادو ورمان' },
    { id: 'm16', name: 'سلطة ستيك لحم غنية بالبروتين', type: 'salad', cal: 410, protein: 32, carbs: 18, desc: 'شرائح ستيك مشوي مع خس وفطر وطماطم كرزية' },
    { id: 'm17', name: 'كبسة دجاج صحية', type: 'daily', cal: 460, protein: 38, carbs: 42, desc: 'صدر دجاج كبسة مع أرز بسمتي صحي ودقوس حار' },
    { id: 'm18', name: 'ملوخية بالدجاج مع ليمون', type: 'daily', cal: 390, protein: 36, carbs: 30, desc: 'ملوخية بلدي مطبوخة بدون دهون مهدرجة مع صدر دجاج' }
  ];

  // Areas in Amman
  const ammanAreas = [
    { name: 'شفا بدران (منطقة الفرع)', delivery: 'توصيل محلي سريع' },
    { name: 'الجبيهة', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'أبو نصير', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'طبربور', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'صويلح', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'تلاع العلي', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'خلدا', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'دابوق', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'عبدون', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'دير غبار', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'الصويفية', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'أم أذينة', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'الشميساني', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'ضاحية الرشيد', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'ماركا', delivery: 'مشمول بالتوصيل اليومي' },
    { name: 'سحاب والمناطق الصناعية', delivery: 'توصيل حسب جدول المنطقة' },
    { name: 'منطقة أخرى في عمّان', delivery: 'يرجى التحديد مع المنسق' }
  ];

  // Active Flow State
  const checkoutState = {
    selectedPlanId: 'plan-m-2',
    currentStep: 1,
    selectedMeals: {}, // mealId -> count
    customerInfo: {
      fullName: '',
      phone: '',
      area: '',
      address: '',
      notes: ''
    },
    paymentMethod: 'cod'
  };

  // ==========================================
  // 2. Navigation & Sticky Header
  // ==========================================
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Drawer Toggle
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');

  function openMobileNav() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) closeMobileNav();
    });
  }

  // Smooth scroll and auto-close mobile drawer
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          closeMobileNav();
          const headerHeight = header ? header.offsetHeight : 80;
          const targetPosition = targetElem.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ==========================================
  // 3. Subscription Tabs (Monthly vs Weekly)
  // ==========================================
  const toggleMonthlyBtn = document.getElementById('toggle-monthly');
  const toggleWeeklyBtn = document.getElementById('toggle-weekly');
  const monthlyPlansContainer = document.getElementById('monthly-plans-wrapper');
  const weeklyPlansContainer = document.getElementById('weekly-plans-wrapper');

  if (toggleMonthlyBtn && toggleWeeklyBtn) {
    toggleMonthlyBtn.addEventListener('click', () => {
      toggleMonthlyBtn.classList.add('active');
      toggleWeeklyBtn.classList.remove('active');
      monthlyPlansContainer.style.display = 'block';
      weeklyPlansContainer.style.display = 'none';
    });

    toggleWeeklyBtn.addEventListener('click', () => {
      toggleWeeklyBtn.classList.add('active');
      toggleMonthlyBtn.classList.remove('active');
      monthlyPlansContainer.style.display = 'none';
      weeklyPlansContainer.style.display = 'block';
    });
  }

  // ==========================================
  // 4. Food Variety Filter Tabs
  // ==========================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const mealCards = document.querySelectorAll('.meal-showcase-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');
      mealCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 5. FAQ Accordion
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerContent = item.querySelector('.faq-answer-content');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer-content');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answerContent.style.maxHeight = answerContent.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ by default
  if (faqItems[0]) {
    faqItems[0].classList.add('active');
    const firstAnswer = faqItems[0].querySelector('.faq-answer-content');
    if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }

  // ==========================================
  // 6. Lead Form Submission
  // ==========================================
  const leadForm = document.getElementById('lead-consultation-form');
  const leadSuccessMsg = document.getElementById('lead-success-message');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-name').value.trim();
      const phone = document.getElementById('lead-phone').value.trim();
      const goal = document.getElementById('lead-goal').value;
      const meals = document.getElementById('lead-meals').value;
      const area = document.getElementById('lead-area').value.trim();

      if (!name || !phone) {
        alert('يرجى ملء الاسم ورقم الهاتف.');
        return;
      }

      // Hide form & show success
      leadForm.style.display = 'none';
      if (leadSuccessMsg) leadSuccessMsg.classList.add('show');

      // Pre-fill WhatsApp link button in success message
      const whatsappLeadBtn = document.getElementById('lead-whatsapp-instant');
      if (whatsappLeadBtn) {
        const text = encodeURIComponent(`مرحباً شِ هيلثي، أنا ${name}، رقمي ${phone}، مهتم باستشارة اختيار اشتراك مناسب لهدفي (${goal}) في منطقة (${area}).`);
        whatsappLeadBtn.href = `https://wa.me/962770071023?text=${text}`;
      }
    });
  }

  // ==========================================
  // 7. FLOW B: Multi-Step Subscription Checkout
  // ==========================================
  const checkoutModal = document.getElementById('checkout-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const stepPanels = document.querySelectorAll('.checkout-step-panel');
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const nextStepBtn = document.getElementById('modal-next-btn');
  const prevStepBtn = document.getElementById('modal-prev-btn');

  // Trigger buttons that open checkout flow
  document.querySelectorAll('.trigger-subscription-flow').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planId = btn.getAttribute('data-plan-id') || 'plan-m-2';
      openCheckoutModal(planId);
    });
  });

  function openCheckoutModal(planId) {
    checkoutState.selectedPlanId = planId in plansData ? planId : 'plan-m-2';
    checkoutState.currentStep = 1;
    checkoutState.selectedMeals = {};
    renderModalPlansList();
    renderMealPicker();
    populateAreaDropdown();
    goToStep(1);

    if (checkoutModal) {
      checkoutModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCheckoutModal() {
    if (checkoutModal) {
      checkoutModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCheckoutModal);
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  // Stepper Navigation
  function goToStep(stepNumber) {
    checkoutState.currentStep = stepNumber;

    // Update panels
    stepPanels.forEach(panel => {
      const panelStep = parseInt(panel.getAttribute('data-step'), 10);
      if (panelStep === stepNumber) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Update progress indicator
    stepIndicators.forEach(indicator => {
      const indStep = parseInt(indicator.getAttribute('data-step'), 10);
      indicator.classList.remove('active', 'completed');
      if (indStep === stepNumber) {
        indicator.classList.add('active');
      } else if (indStep < stepNumber) {
        indicator.classList.add('completed');
      }
    });

    // Control Next / Back buttons
    if (prevStepBtn) {
      prevStepBtn.style.display = (stepNumber > 1 && stepNumber < 5) ? 'inline-flex' : 'none';
    }

    if (nextStepBtn) {
      if (stepNumber === 1) {
        nextStepBtn.style.display = 'inline-flex';
        nextStepBtn.textContent = 'المتابعة لاختيار الوجبات ←';
      } else if (stepNumber === 2) {
        nextStepBtn.style.display = 'inline-flex';
        nextStepBtn.textContent = 'المتابعة للبيانات الشخصية ←';
      } else if (stepNumber === 3) {
        nextStepBtn.style.display = 'inline-flex';
        nextStepBtn.textContent = 'المتابعة للدفع ←';
      } else if (stepNumber === 4) {
        nextStepBtn.style.display = 'inline-flex';
        nextStepBtn.textContent = 'تأكيد الطلب الآن 🍱';
      } else if (stepNumber === 5) {
        nextStepBtn.style.display = 'none';
        renderOrderConfirmation();
      }
    }
  }

  // Next / Prev button events
  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
      const current = checkoutState.currentStep;
      if (current === 1) {
        goToStep(2);
      } else if (current === 2) {
        goToStep(3);
      } else if (current === 3) {
        // Validate customer form
        const nameInput = document.getElementById('cust-name');
        const phoneInput = document.getElementById('cust-phone');
        const areaSelect = document.getElementById('cust-area');
        const addrInput = document.getElementById('cust-address');

        if (!nameInput.value.trim() || !phoneInput.value.trim() || !areaSelect.value) {
          alert('يرجى إدخال الاسم ورقم الهاتف واختيار المنطقة.');
          return;
        }

        checkoutState.customerInfo.fullName = nameInput.value.trim();
        checkoutState.customerInfo.phone = phoneInput.value.trim();
        checkoutState.customerInfo.area = areaSelect.value;
        checkoutState.customerInfo.address = addrInput.value.trim();
        checkoutState.customerInfo.notes = (document.getElementById('cust-notes') || {}).value || '';

        goToStep(4);
      } else if (current === 4) {
        // Step 4: Payment selected
        const selectedPaymentRadio = document.querySelector('input[name="payment_choice"]:checked');
        if (selectedPaymentRadio) {
          checkoutState.paymentMethod = selectedPaymentRadio.value;
        }
        goToStep(5);
      }
    });
  }

  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', () => {
      if (checkoutState.currentStep > 1) {
        goToStep(checkoutState.currentStep - 1);
      }
    });
  }

  // Render Plan Selection List inside Modal
  function renderModalPlansList() {
    const container = document.getElementById('modal-plans-list-container');
    if (!container) return;
    container.innerHTML = '';

    Object.values(plansData).forEach(plan => {
      const isSelected = plan.id === checkoutState.selectedPlanId;
      const card = document.createElement('div');
      card.className = `modal-plan-option ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <div>
          <h4>${plan.title}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">${plan.breakdownText}</p>
        </div>
        <div class="plan-price">${plan.priceFormatted}</div>
      `;
      card.addEventListener('click', () => {
        checkoutState.selectedPlanId = plan.id;
        renderModalPlansList();
        renderMealPicker();
      });
      container.appendChild(card);
    });
  }

  // Render Meal Selection List
  function renderMealPicker() {
    const plan = plansData[checkoutState.selectedPlanId];
    const counterBar = document.getElementById('modal-meals-counter-bar');
    const grid = document.getElementById('modal-meals-grid');

    if (counterBar) {
      let breakdownHtml = '';
      if (plan.breakdown.chicken) {
        breakdownHtml += `<span class="counter-item">🍗 دجاج: <strong class="counter-tag" id="count-chicken">${plan.breakdown.chicken} وجبة</strong></span>`;
      }
      if (plan.breakdown.beef) {
        breakdownHtml += `<span class="counter-item">🥩 لحمة: <strong class="counter-tag" id="count-beef">${plan.breakdown.beef} وجبة</strong></span>`;
      }
      if (plan.breakdown.fish) {
        breakdownHtml += `<span class="counter-item">🐟 سمك: <strong class="counter-tag" id="count-fish">${plan.breakdown.fish} وجبة</strong></span>`;
      }
      if (plan.breakdown.salad) {
        breakdownHtml += `<span class="counter-item">🥗 سلطات: <strong class="counter-tag" id="count-salad">${plan.breakdown.salad} سلطة</strong></span>`;
      }

      counterBar.innerHTML = `
        <div style="font-size: 0.95rem; font-weight: 700; color: var(--primary-dark);">
          الخطة المختارة: <strong>${plan.title}</strong> (${plan.mealsTotal} وجبة)
        </div>
        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
          ${breakdownHtml}
        </div>
      `;
    }

    if (grid) {
      grid.innerHTML = '';
      mealsList.forEach(meal => {
        const count = checkoutState.selectedMeals[meal.id] || 0;
        const item = document.createElement('div');
        item.className = `modal-meal-item ${count > 0 ? 'selected' : ''}`;
        item.innerHTML = `
          <div>
            <div class="modal-meal-name">${meal.name}</div>
            <div class="modal-meal-meta">${meal.desc}</div>
            <div style="font-size: 0.78rem; color: var(--fresh-green); font-weight: 700; margin-top: 4px;">
              ${meal.cal} سعرة • ${meal.protein}g بروتين
            </div>
          </div>
          <div class="meal-qty-controls">
            <button type="button" class="qty-btn btn-minus" data-id="${meal.id}">−</button>
            <span class="qty-val" id="qty-${meal.id}">${count}</span>
            <button type="button" class="qty-btn btn-plus" data-id="${meal.id}">+</button>
          </div>
        `;
        grid.appendChild(item);
      });

      // Bind plus / minus
      grid.querySelectorAll('.btn-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          checkoutState.selectedMeals[id] = (checkoutState.selectedMeals[id] || 0) + 1;
          const display = document.getElementById(`qty-${id}`);
          if (display) display.textContent = checkoutState.selectedMeals[id];
        });
      });

      grid.querySelectorAll('.btn-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (checkoutState.selectedMeals[id] > 0) {
            checkoutState.selectedMeals[id] -= 1;
            const display = document.getElementById(`qty-${id}`);
            if (display) display.textContent = checkoutState.selectedMeals[id];
          }
        });
      });
    }
  }

  // Populate Area Dropdown
  function populateAreaDropdown() {
    const select = document.getElementById('cust-area');
    if (!select || select.options.length > 1) return;

    ammanAreas.forEach(area => {
      const opt = document.createElement('option');
      opt.value = area.name;
      opt.textContent = `${area.name} — (${area.delivery})`;
      select.appendChild(opt);
    });
  }

  // Render Confirmation Step 5
  function renderOrderConfirmation() {
    const plan = plansData[checkoutState.selectedPlanId];
    const container = document.getElementById('order-summary-content');
    const orderId = 'SHI-' + Math.floor(100000 + Math.random() * 900000);

    const paymentLabels = {
      'cod': 'الدفع كاش عند الاستلام',
      'card': 'البطاقة الائتمانية (Visa / Mastercard)',
      'cliq': 'كليك أو محفظة إلكترونية (CliQ / ZainCash)',
      'split': 'الدفع مقسم على دفعتين'
    };

    let selectedMealsSummary = '';
    const mealKeys = Object.keys(checkoutState.selectedMeals);
    if (mealKeys.length > 0) {
      const itemsArr = [];
      mealKeys.forEach(mId => {
        const qty = checkoutState.selectedMeals[mId];
        if (qty > 0) {
          const mealObj = mealsList.find(m => m.id === mId);
          if (mealObj) itemsArr.push(`${mealObj.name} (عدد ${qty})`);
        }
      });
      if (itemsArr.length > 0) {
        selectedMealsSummary = itemsArr.join('، ');
      } else {
        selectedMealsSummary = 'تشكيلة شِ هيلثي المتوازنة والمحسوبة';
      }
    } else {
      selectedMealsSummary = 'تشكيلة شِ هيلثي المتوازنة والمحسوبة';
    }

    if (container) {
      container.innerHTML = `
        <div class="summary-row">
          <span>رقم الطلب:</span>
          <strong>#${orderId}</strong>
        </div>
        <div class="summary-row">
          <span>الاشتراك:</span>
          <strong>${plan.title} (${plan.mealsTotal} وجبة)</strong>
        </div>
        <div class="summary-row">
          <span>سعر الاشتراك:</span>
          <strong>${plan.price} دينار أردني</strong>
        </div>
        <div class="summary-row">
          <span>الاسم الكامل:</span>
          <span>${checkoutState.customerInfo.fullName}</span>
        </div>
        <div class="summary-row">
          <span>رقم الهاتف:</span>
          <span style="direction: ltr;">${checkoutState.customerInfo.phone}</span>
        </div>
        <div class="summary-row">
          <span>المنطقة:</span>
          <span>${checkoutState.customerInfo.area}</span>
        </div>
        <div class="summary-row">
          <span>طريقة الدفع المختارة:</span>
          <span>${paymentLabels[checkoutState.paymentMethod] || 'كاش عند الاستلام'}</span>
        </div>
        <div class="summary-row total">
          <span>المجموع (لا يشمل التوصيل):</span>
          <span>${plan.price} د.أ</span>
        </div>
        <p style="font-size: 0.85rem; color: #8A6D3B; margin-top: 12px; background: #FFF8E7; padding: 8px 12px; border-radius: 6px;">
          * ملاحظة: تكلفة التوصيل تعتمد على منطقة التوصيل وسيتم تأكيدها عند التواصل معك.
        </p>
      `;
    }

    // Direct WhatsApp Link
    const waBtn = document.getElementById('confirm-whatsapp-btn');
    if (waBtn) {
      const msg = encodeURIComponent(
        `مرحباً شِ هيلثي،\n` +
        `قمت بطلب اشتراك جديد عبر الموقع:\n` +
        `رقم الطلب: #${orderId}\n` +
        `الخطة: ${plan.title} (${plan.priceFormatted})\n` +
        `الاسم: ${checkoutState.customerInfo.fullName}\n` +
        `الهاتف: ${checkoutState.customerInfo.phone}\n` +
        `المنطقة: ${checkoutState.customerInfo.area}\n` +
        `العنوان: ${checkoutState.customerInfo.address}\n` +
        `طريقة الدفع: ${paymentLabels[checkoutState.paymentMethod] || 'كاش'}\n` +
        `أرجو تأكيد موعد بدء التوصيل. 💚`
      );
      waBtn.href = `https://wa.me/962770071023?text=${msg}`;
    }
  }

  // ==========================================
  // 8. Delivery Area Calculator Modal
  // ==========================================
  const deliveryModal = document.getElementById('delivery-modal');
  const deliveryCloseBtn = document.getElementById('delivery-modal-close');
  const deliveryAreaSelect = document.getElementById('calc-area-select');
  const deliveryResultBox = document.getElementById('calc-result-box');
  const openDeliveryModalBtns = document.querySelectorAll('.open-delivery-modal');

  openDeliveryModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (deliveryModal) {
        deliveryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (deliveryCloseBtn && deliveryModal) {
    deliveryCloseBtn.addEventListener('click', () => {
      deliveryModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    deliveryModal.addEventListener('click', (e) => {
      if (e.target === deliveryModal) {
        deliveryModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (deliveryAreaSelect && deliveryAreaSelect.options.length <= 1) {
    ammanAreas.forEach(area => {
      const opt = document.createElement('option');
      opt.value = area.name;
      opt.textContent = area.name;
      deliveryAreaSelect.appendChild(opt);
    });

    deliveryAreaSelect.addEventListener('change', () => {
      const val = deliveryAreaSelect.value;
      if (val && deliveryResultBox) {
        deliveryResultBox.style.display = 'block';
        deliveryResultBox.innerHTML = `
          <div style="background-color: var(--lime-subtle); border: 1.5px solid var(--fresh-green); padding: 16px 20px; border-radius: var(--radius-md); text-align: right;">
            <h4 style="color: var(--primary-dark); margin-bottom: 6px; font-size: 1.1rem;">منطقة: ${val} 🚗</h4>
            <p style="font-size: 0.95rem; color: var(--text-dark); margin-bottom: 10px;">
              توصيل يومي مباشر من مطبخنا في شفا بدران لضمان وصول الوجبات طازجة وفي موعدها.
            </p>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px;">
              * أسعار الاشتراكات لا تشمل التوصيل. التكلفة تختلف حسب المسافة، وتتوفر أحياناً عروض توصيل مجاني على بعض الاشتراكات الشهرية.
            </p>
            <a href="https://wa.me/962770071023?text=${encodeURIComponent('مرحباً، أود الاستفسار عن تكلفة وعروض التوصيل لمنطقة ' + val)}" target="_blank" class="btn btn-primary btn-sm">
              استفسر عن عروض منطقتك عبر واتساب
            </a>
          </div>
        `;
      }
    });
  }

  // ==========================================
  // 9. Nutritionist Consultation Trigger
  // ==========================================
  document.querySelectorAll('.open-nutritionist-chat').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = encodeURIComponent('مرحباً، أود استشارة أخصائية التغذية في شِ هيلثي لاختيار الخطة الأنسب لاحتياجاتي ونمط حياتي. 🥗');
      window.open(`https://wa.me/962770071023?text=${text}`, '_blank');
    });
  });

});
