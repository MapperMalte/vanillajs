class MyNavbar
{
    static build(){
        const headerBuilder = new HeaderBuilder();

        // Define the petal SVG content as a string
        const petalSvg = `
         <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg fill="#000000" width="60px" height="60px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M128 220c-50.81 0-92-41.19-92-92s41.19-92 92-92 92 41.19 92 92-41.19 92-92 92zm-.5-139.23c27.094 0 36.41 18.143 43.998 31.187 10.798 18.56 11.931 31.154 35.889 40.868C210 140.22 210 141.57 210 127.5c0-45.563-36.937-82.5-82.5-82.5S45 81.937 45 127.5c0 11.61-1.603 13.593 2.549 25.325 20.955-6.887 30.758-29.192 34.67-39.144 5.526-14.056 18.187-32.91 45.281-32.91zm.5 24.615c-17.128 0-31.173 32.022-34.929 39.68-3.756 7.659-16.584 25.445-34.306 29.902 14.782 22.217 40.049 36.858 68.735 36.858 28.448 0 53.532-14.398 68.364-36.305-14.832-10.778-22.641-15.315-33.531-30.455-8.994-12.504-17.205-39.68-34.333-39.68z" fill-rule="evenodd"/>
        </svg>
        `;

        // Set the logo with the petal SVG content
        headerBuilder.setLogo(petalSvg);
        headerBuilder
          .addNavLink('Form', './form.html')
          .addNavLink('Tabelle', './table.html')
          .addNavLink('Click-Counter', './click_counter.html')
        return headerBuilder;
    }
}