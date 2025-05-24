import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        <img src="/images/logo.png" alt="Logo" width="100"> | 2025&copy;
    </div>`
})
export class AppFooter {}
