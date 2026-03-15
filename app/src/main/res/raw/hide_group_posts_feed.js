// Hide group posts in feed
(function() {
  function processNode(node) {
    if (!(node instanceof HTMLElement)) return;
    if (window.location.pathname !== '/' && !window.location.pathname.startsWith('/home')) return;

    // Look for links to /groups/ within the post headers
    const groupLinks = node.querySelectorAll('a[href*="/groups/"]');

    groupLinks.forEach(link => {
      // In Facebook feeds, group posts usually have a header where the group name is linked.
      // E.g., User > Group Name
      // We traverse up to find the closest wrapper for the entire post.
      // The exact class might vary, but usually finding the closest 'article' or major 'div' wrapper works.
      const postContainer = link.closest('div[data-tracking-duration-id]') || link.closest('article');
      
      if (postContainer && postContainer.style.display !== 'none') {
        postContainer.style.display = 'none';
        
        // Hide the gap if it exists (mobile view uses specific gap wrappers)
        const postGap = postContainer.previousElementSibling;
        if (postGap) {
          postGap.style.display = 'none';
        }
      }
    });
  }

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        processNode(node);
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  processNode(document.body);
})();
