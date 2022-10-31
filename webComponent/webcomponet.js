class MyCustomElemet extends HTMLElemnt {
  constructor() {
    super();
  }
  // 커스텀 요소가 생성될 때마다 실행
  connectedCallback() {
    this.render();
  }
  // 해당 요소가 새로운 문서로 이동될 때마다  호출
  adoptCallback() {
  }

  // 요소의 속성 변동 사항(추가,제거,업데이트,교체)을 관찰하고 호출함
  // observedAttributes() 속성에 나열된 특성에서만 호출
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  // attributeChangedCallback 에서 관찰하는 항목을 반환.
  static get observedAttributes() {
    return ['title'];
  }
  get title() {
    return this.getAttribute('title');
  }

  // 커스텀 요소가 제거될 때 호출 
  disconnectedCallback() {
    alert('bye bye');
  }
  // 커스텀 메서드 
  render() {
    this.innerHTML = `
    <h1>${this.title}</h1>
   `
  }
}

customElements.define('my-counter', MyCustomElemet);