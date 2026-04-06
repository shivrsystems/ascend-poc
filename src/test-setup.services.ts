import '@angular/compiler';
import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed, ɵgetCleanupHook as getCleanupHook } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

beforeEach(getCleanupHook(false));
afterEach(getCleanupHook(true));

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
class VitestAngularTestModule {}

getTestBed().initTestEnvironment(
  [BrowserTestingModule, VitestAngularTestModule],
  platformBrowserTesting(),
  { teardown: { destroyAfterEach: true } },
);
