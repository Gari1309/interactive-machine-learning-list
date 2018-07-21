document.addEventListener('DOMContentLoaded', function(){
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
});



Vue.component('tag-selector', {
  props: ['all-tags'],
  template: document.getElementById('tag-selector'),
});


const app = new Vue({
  el: '#app',
  data: {
    websites: [],
    allTags: [],
    filters: []
  },
  created: function () {
    const that = this;
    fetch("websites.yaml")
      .then(response => response.text())
      .then(text => {
        that.websites = jsyaml.load(text);
        that.websites.forEach((website) =>
          website.tags.concat(website.uses).forEach((tag) => {
            if (that.allTags.indexOf(tag) === -1) {
              that.allTags.push(tag);
            }
          })
        )
    });
  },
  methods: {
    etAl: (authors) => {
      if (authors.length < 3) {
        return authors.join(", ");
      } else {
        return authors.slice(0, 3).join(", ") + "et al.";
      }
    },
    addToFilters: function (tag) {
        const that = this;
        this.filters.push(tag);
    }
  }
});


