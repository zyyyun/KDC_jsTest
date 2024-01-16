class DarkModeToggle {

  isDarkMode = null;

  constructor({ $target, onSearch }) {
    const $wrapper = document.createElement('section');
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $wrapper.appendChild($DarkModeToggle);
    $target.appendChild($wrapper);

    $DarkModeToggle.addEventListener("change", e => {
      this.setColorMode(e.target.checked);
    });

    console.log("DarkModeToggle created.", this);

    this.initColorMode();
  }
  initColorMode(){
    //초기화
    //isDarkMode state, checkbox 상태, html attr
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.$DarkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
    
  }

  setColorMode(isDarkMode){
    document.documentElement.setAttribute('color-mode', 
    isDarkMode ? 'dark' : 'light');
  }

  render() {}
}
