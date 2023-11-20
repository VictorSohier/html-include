class HtmlInclude extends HTMLElement
{
	constructor()
	{
		super();
		const src = this.getAttribute("src");
		const xhr = new XMLHttpRequest();
		const component = this;
		xhr.onreadystatechange = function()
		{
			switch (xhr.readyState)
			{
				case(4):
				{
					const element = document
						.createElement("template");
					element.innerHTML = xhr.responseText;
					const scripts = element.content.querySelectorAll("script");
					component.outerHTML = xhr.responseText;
					for (let i = 0; i < scripts.length; i++)
						eval(scripts[i].innerText);
				}
			}
		}
		xhr.open("GET", src, true);
		xhr.send();
	}
}

window.customElements.define("html-include", HtmlInclude);
