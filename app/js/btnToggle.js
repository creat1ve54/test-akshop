const menu = [
  {
    id: 1,
    name: 'Мясо',
    items: [
      {
        id: 1,
        name: 'Мясо2',
        items: [
          {
            id: 1,
            name: 'Мясо',
          },
        ],
      },
      {
        id: 2,
        name: 'Мясо2',
      },
    ],
  },
  {
    id: 2,
    name: 'Молоко',
    items: [
      {
        id: 1,
        name: 'Молоко2',
        items: [
          {
            id: 1,
            name: 'Молоко3',
          },
        ],
      },
      {
        id: 2,
        name: 'Молоко2',
      },
    ],
  },
  {
    id: 3,
    name: 'Кефир',
    items: [
      {
        id: 1,
        name: 'Кефир2',
        items: [
          {
            id: 1,
            name: 'Кефир3',
          },
        ],
      },
      {
        id: 2,
        name: 'Кефир2',
      },
    ],
  },
];

let eventChange = 'click';
// let eventChange = 'mouseenter'

function openNextList(mainBlock, items, eventChange, level, name) {
  const block = document.createElement('div');
  block.classList = 'btn-toggle__catalog-list';
  const header = document.createElement('div');
  header.classList = 'btn-toggle__catalog-header';
  const container = document.createElement('div');
  container.classList = 'btn-toggle__catalog-container';
  if (level == 1) {
    header.innerHTML = `
    <button class="btn-toggle__catalog-header-case" type="button" data-toggle-back="data-toggle-back">
      <svg>
          <use xlink:href="/assets/icons/sprite.svg#arrowRight"></use>
      </svg>
      <div class="h4">Каталог</div>
    </button>
    <button class="btn-toggle__catalog-header-close"type="button" data-toggle-close="data-toggle-close">
      <svg>
          <use xlink:href="/assets/icons/sprite.svg#closeBurgerMobile"></use>
      </svg>
    </button>
  `;
  } else {
    header.innerHTML = `
    <button class="btn-toggle__catalog-header-case" type="button" data-toggle-back="data-toggle-back">
      <svg>
          <use xlink:href="/assets/icons/sprite.svg#arrowRight"></use>
      </svg>
      <div class="h4">${name}</div>
    </button>
    <button class="btn-toggle__catalog-header-close"type="button" data-toggle-close="data-toggle-close">
      <svg>
          <use xlink:href="/assets/icons/sprite.svg#closeBurgerMobile"></use>
      </svg>
    </button>
  `;
  }

  block.appendChild(header);
  block.appendChild(container);

  header.querySelector('[data-toggle-close]')?.addEventListener('click', () => {
    mainBlock.classList.remove('btn-toggle__catalog--active');
    let array = mainBlock.children.length;
    for (let i = 1; i < array; i++) {
      setTimeout(() => {
        mainBlock.removeChild(mainBlock.children[mainBlock.children.length - 1]);
      }, 500);
    }
  });

  header.querySelector('[data-toggle-back]')?.addEventListener('click', () => {
    if (mainBlock.children.length > 1) {
      mainBlock.children[mainBlock.children.length - 1].classList.remove('btn-toggle__catalog-list--active');
      setTimeout(() => {
        mainBlock.removeChild(mainBlock.children[mainBlock.children.length - 1]);
      }, 500);
    } else {
      mainBlock.classList.remove('btn-toggle__catalog--active');
    }
  });

  if (mainBlock.children.length != level) {
    // mainBlock.appendChild(blockHeader);
    mainBlock.appendChild(block);
  } else {
    mainBlock.removeChild(mainBlock.children[level - 1]);
    mainBlock.appendChild(block);
  }

  setTimeout(() => {
    block.classList.add('btn-toggle__catalog-list--active');
  }, 1);

  items.forEach((item) => {
    const itemBlock = document.createElement('button');
    itemBlock.type = 'button';
    itemBlock.classList = 'btn-toggle__catalog-stage';
    itemBlock.innerHTML = `<a href="##" class="btn-toggle__catalog-text">${item.name}</a>`;
    if (item.items && level == 1) {
      itemBlock.innerHTML = `
        <a href="/test.html" class="btn-toggle__catalog-text btn-toggle__catalog-stage-case">
          <div class='btn-toggle__catalog-stage-img'>
            <svg class="btn-toggle__catalog-img">
              <use xlink:href="/assets/icons/sprite.svg#catalogsCart${item.id}"></use>
            </svg>
          </div> 
          ${item.name}
        </a>
        <svg class="btn-toggle__catalog-img">
          <use xlink:href="/assets/icons/sprite.svg#caretUp"></use>
        </svg>
        `;
    } else {
      itemBlock.innerHTML = `
        <a href="/test.html" class="btn-toggle__catalog-text">${item.name}</a>
        <svg class="btn-toggle__catalog-img">
          <use xlink:href="/assets/icons/sprite.svg#caretUp"></use>
        </svg>
        `;
    }

    itemBlock.addEventListener(eventChange, (e) => {
      block.querySelectorAll('.btn-toggle__catalog-stage').forEach((child) => {
        if (child.classList.contains('btn-toggle__catalog-stage--active')) {
          child.classList.remove('btn-toggle__catalog-stage--active');
        }
      });
      itemBlock.classList.add('btn-toggle__catalog-stage--active');
      const mainLengt = mainBlock.children.length;

      if (item.items) {
        if (!e.target.parentNode.nextSibling) {
          openNextList(mainBlock, item.items, eventChange, level + 1, item.name);
        } else {
          mainBlock.removeChild(mainBlock.children[mainLengt - 1]);
          openNextList(mainBlock, item.items, eventChange, level + 1, item.name);
        }
      } else {
        if (e.target.parentNode.nextSibling) {
          mainBlock.removeChild(mainBlock.children[mainLengt - 1]);
        }
      }
    });

    container.appendChild(itemBlock);
  });
}

const menuList = document.querySelector('.menu');
const catalogFixed = document.querySelector('.header__up-fixed-catalog');

if (catalogFixed) {
  const btnToggle = catalogFixed.querySelector('.btn-toggle');
  // const mainBlock = btnToggle.querySelector('.btn-toggle__catalog-container');
  const mainBlock = btnToggle.querySelector('.btn-toggle__catalog');
  openNextList(mainBlock, menu, eventChange, 1);
}

if (menuList) {
  const btnToggle = menuList.querySelector('.btn-toggle');
  // const mainBlock = btnToggle.querySelector('.btn-toggle__catalog-container');
  const mainBlock = btnToggle.querySelector('.btn-toggle__catalog');

  document.querySelector('[data-opeeen]')?.addEventListener('click', () => {
    mainBlock.classList.add('btn-toggle__catalog--active');
  });

  openNextList(mainBlock, menu, eventChange, 1);
}

const btnToggleMobile = document.querySelector('.btn-toggle--mobile');
const btnToggleMobileBtn = btnToggleMobile?.querySelector('.btn-toggle__button');
const btnToggleCatalog = btnToggleMobile?.querySelector('.btn-toggle__catalog');
const catalogStageTexts = btnToggleMobile?.querySelectorAll('.btn-toggle__catalog-stage-text');

if (catalogStageTexts) {
  catalogStageTexts.forEach((catalogStageText) => {
    catalogStageText.addEventListener('click', () => {
      catalogStageText.parentElement.classList.toggle('btn-toggle__catalog-stage--active');
      catalogStageText.firstElementChild.classList.toggle('btn-toggle__catalog-text--active');
      const level = catalogStageText.parentElement.dataset;
      let parentNode;
      if (catalogStageText.nextElementSibling != null) {
        for (let index = level['level']; index > 0; index--) {
          if (level['level'] == 1) {
            if (catalogStageText.parentElement.classList.contains('btn-toggle__catalog-stage--active')) {
              btnToggleCatalog.style.maxHeight = btnToggleCatalog.scrollHeight + catalogStageText.nextElementSibling.scrollHeight + 'px';
              catalogStageText.nextElementSibling.style.maxHeight = catalogStageText.nextElementSibling.scrollHeight + 'px';
            } else {
              btnToggleCatalog.style.maxHeight = btnToggleCatalog.scrollHeight - catalogStageText.nextElementSibling.scrollHeight + 'px';
              catalogStageText.nextElementSibling.style.maxHeight = 0;
            }
          } else {
            if (index == level['level']) {
              parentNode = catalogStageText.parentElement.parentElement;
            } else {
              parentNode = parentNode.parentElement.parentElement;
            }
            if (catalogStageText.parentElement.classList.contains('btn-toggle__catalog-stage--active')) {
              if (index != 1) {
                parentNode.style.maxHeight = parentNode.scrollHeight + catalogStageText.nextElementSibling.scrollHeight + 'px';
                btnToggleCatalog.style.maxHeight = btnToggleCatalog.scrollHeight + parentNode.scrollHeight + 'px';
              } else {
                catalogStageText.nextElementSibling.style.maxHeight = catalogStageText.nextElementSibling.scrollHeight + 'px';
              }
            } else {
              if (index != 1) {
                parentNode.style.maxHeight = parentNode.scrollHeight - catalogStageText.nextElementSibling.scrollHeight + 'px';
              } else {
                btnToggleCatalog.style.maxHeight = btnToggleCatalog.scrollHeight - catalogStageText.nextElementSibling.scrollHeight + 'px';
                catalogStageText.nextElementSibling.style.maxHeight = 0;
              }
            }
          }
        }
      }
    });
  });
}

btnToggleMobileBtn?.addEventListener('click', () => {
  btnToggleMobileBtn.classList.toggle('btn-toggle__button--active');
  if (btnToggleMobileBtn.classList.contains('btn-toggle__button--active')) {
    btnToggleMobileBtn.nextElementSibling.style.maxHeight = btnToggleMobileBtn.nextElementSibling.scrollHeight + 'px';
  } else {
    btnToggleMobileBtn.nextElementSibling.style.maxHeight = 0 + 'px';
  }
  // openNextListMobile(btnToggleCatalog);
});
