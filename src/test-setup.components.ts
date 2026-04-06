import '@angular/compiler';
import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import {
  TestBed,
  getTestBed,
  ɵgetCleanupHook as getCleanupHook,
} from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { afterEach, beforeEach } from 'vitest';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-serializers';
import '@testing-library/jest-dom';

beforeEach(getCleanupHook(false));
afterEach(getCleanupHook(true));

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
class VitestAngularTestModule {}

TestBed.resetTestEnvironment();
getTestBed().initTestEnvironment(
  [BrowserTestingModule, VitestAngularTestModule],
  platformBrowserTesting(),
  { teardown: { destroyAfterEach: true } },
);
