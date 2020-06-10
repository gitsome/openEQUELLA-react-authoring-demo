import React from 'react';

export default class Breadcrumb {
  public to: string = '';
  public title: string = '';
  public icon: (() => React.ReactNode) | undefined = undefined;
}