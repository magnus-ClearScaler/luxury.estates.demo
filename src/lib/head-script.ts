/**
 * The one script in the document head (layout.tsx), run before the body is
 * parsed. It needs no React, so none of it waits for hydration.
 *
 * 1. Marks the document as scripted, so image fades only apply when
 *    JavaScript can reveal them (globals.css `.js .frame > img`).
 * 2. Marks each frame photograph as loaded the moment it loads: a capturing
 *    `load` listener on the document sees every image, including those added
 *    by client navigation (an eager frame's image sits in a <picture>).
 * 3. The header (brief 5.1): `data-compact` once the page is scrolled past
 *    40px.
 * 4. The menu drawer (brief 5.2): MENU opens it (focus to the X, body scroll
 *    locked, the panel no longer inert); the X, a backdrop click and Escape
 *    close it, focus back to MENU only from the keyboard (a keyboard
 *    activation clicks with `detail` 0), otherwise the focus is dropped;
 *    following a drawer link to another page, or going back, closes it.
 *
 * Plain ES2017 in a string; every element is looked up when needed, so it
 * runs before the header exists and survives client navigation.
 */
export const headScript = `(function(){
var d=document,open=false,overflow="";
d.documentElement.classList.add("js");
d.addEventListener("load",function(e){var t=e.target;if(t.tagName!=="IMG")return;var p=t.parentNode;if(p&&p.tagName==="PICTURE")p=p.parentNode;if(p&&p.classList&&p.classList.contains("frame"))t.setAttribute("data-loaded","true")},true);
function q(s){return d.querySelector(s)}
function onScroll(){var h=q(".site-header"),v=window.scrollY>40?"true":"false";if(h&&h.getAttribute("data-compact")!==v)h.setAttribute("data-compact",v)}
addEventListener("scroll",onScroll,{passive:true});
d.addEventListener("DOMContentLoaded",onScroll);
function setOpen(v,how){var r=q(".drawer-root"),p=q("#site-drawer"),m=q(".menu-button");if(!r||!p||!m||v===open)return;open=v;
r.setAttribute("data-open",v?"true":"false");m.setAttribute("aria-expanded",v?"true":"false");p.inert=!v;
if(v){overflow=d.body.style.overflow;d.body.style.overflow="hidden";var x=q(".drawer-close");if(x)x.focus();return}
d.body.style.overflow=overflow;if(how==="keyboard")m.focus();else if(how==="pointer"){var a=d.activeElement;if(a&&a.blur)a.blur()}}
d.addEventListener("click",function(e){var t=e.target;if(!t||!t.closest)return;
if(t.closest(".menu-button")){setOpen(true);return}
if(!open)return;
if(t.closest(".drawer-backdrop")){setOpen(false,"pointer");return}
if(t.closest(".drawer-close")){setOpen(false,e.detail===0?"keyboard":"pointer");return}
var a=t.closest("#site-drawer a[href]");if(a&&a.pathname!==location.pathname)setOpen(false)});
d.addEventListener("keydown",function(e){if(open&&e.key==="Escape")setOpen(false,"keyboard")});
addEventListener("popstate",function(){if(open)setOpen(false)});
})();`;
