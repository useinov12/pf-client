# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.1.1 (2022-10-21)


### Features

* toast on login and sign up ([81022c0](https://github.com/useinov12/pf-client/commit/81022c018bfaf97bccb07ff36f71f5a791800915))
* user component with dropdown and logout feat ([82e5884](https://github.com/useinov12/pf-client/commit/82e58849f0098988db733e9acc425029cf9b4115))


### Bug Fixes

* a tag changed to next link ([4741a82](https://github.com/useinov12/pf-client/commit/4741a82ac57a71a03b4e8f523c63508ea320098f))
* card section content fix ([1913339](https://github.com/useinov12/pf-client/commit/19133396fe719064bd8e4d93f7b2d50db87b0a95))
* chart production mode webpack resolve ([3741247](https://github.com/useinov12/pf-client/commit/37412477bf5bae34b089ecc6023705392cfdb167))
* chart production mode webpack resolve ([0826243](https://github.com/useinov12/pf-client/commit/082624370b8492d39790bb3d382b3cb722c31cdf))
* charts width and height props ([c460b4e](https://github.com/useinov12/pf-client/commit/c460b4e54597953edead234841a762cf7560feef))
* checker for user context ([34c2816](https://github.com/useinov12/pf-client/commit/34c281629e9e360af1009776e30980a0e000703c))
* checker for user context ([d7d9c61](https://github.com/useinov12/pf-client/commit/d7d9c6100c86cce66776b46dd90bba8d40a62475))
* chip import removed ([03470fd](https://github.com/useinov12/pf-client/commit/03470fdff3b6976e18d51c9ecd1f9e8ab2f0489d))
* classname removed from next link ([2723099](https://github.com/useinov12/pf-client/commit/27230994e08e5ece6a0cc8c0554830642c411886))
* console log for max ([e736cb7](https://github.com/useinov12/pf-client/commit/e736cb7fc6d5fbd23138861cd03dff4a47f72439))
* console log for max ([2bed933](https://github.com/useinov12/pf-client/commit/2bed93311baa1c3a5abae9f673203485ccf9ce9a))
* console log for tests ([4c2289e](https://github.com/useinov12/pf-client/commit/4c2289edd1e122181f66e215d880b87ba82bf168))
* form card heading color fixed ([5bfd091](https://github.com/useinov12/pf-client/commit/5bfd091095f8e82725292130224ed140c1da88dd))
* line controller fix ([b5a19aa](https://github.com/useinov12/pf-client/commit/b5a19aaec13840ea8de36edbeee3808ca262b5de))
* line controller fix ([e9f5071](https://github.com/useinov12/pf-client/commit/e9f5071430cb426e71ac7eb6192f4ee21eb54a54))
* mobile styles for cards fix ([ba0d617](https://github.com/useinov12/pf-client/commit/ba0d61767a2ea44f6f1bbe69ff0fc349c18d0a1f))
* response checker ([ffc8f46](https://github.com/useinov12/pf-client/commit/ffc8f46071cf6bdd77551bf884a9f0deaf75f415))
* temporary api response structurefix ([9b12078](https://github.com/useinov12/pf-client/commit/9b12078e0dcec776f7ad6db5e381dc9a61366095))
* test logs ([232c134](https://github.com/useinov12/pf-client/commit/232c13409042142e3c1793600466f0c81cc2b2b0))

## 0.5.4 - 2022-07-22

### New Features

- #### Release Please

    Standard Version is now deprecated, and ts-nextjs-tailwind-starter is now using release please. Activate them on `.github/workflows/release-please`

### Improvements & Bug Fixes

- #### More Efficient Lint Actions
    
    Lint workflow is now cached and will cancel previous run if there are 2 concurrent runs.

## 0.5.3 - 2022-02-27

### New Features

- #### Shimmer for NextImage and Skeleton
    
    Addition of shimmer & blur placeholder for NextImage, and new Skeleton Component with shimmer effect.

    https://user-images.githubusercontent.com/55318172/155867729-8c3176ad-ede4-4443-b42b-780517615e5a.mp4


- #### Support for SVGR

    You can directly import SVG like

    ```tsx
    import Vercel from '~/svg/Vercel.svg';

    <Vercel className='text-5xl' />
    ```

- #### Public Folder Path Mapping

    Easily access public folder with `~/` prefix.

- #### Tailwind CSS Prettier Sorter

    ts-nextjs-tailwind-starter now use first-party plugin `prettier-plugin-tailwindcss`

### Improvements & Bug Fixes

- #### Layout Declared Twice

    Fix issue where adding elements to Layout ends up rendering them twice

- #### ESLint Curly Brace Rule

    New autofixable rule
    
    ```tsx
    props={'hi'}

    will become

    props='hi'
    ```

## 0.5.2 - 2021-12-30

### New Features

- #### New Component: PrimaryLink

    Add a link component with accent color on top of UnstyledLink.

### Improvements & Bug Fixes

- #### Unused Import ESlint Autofix

    Unused import will automatically be removed by the ESlint autofix.

- #### Renamed CustomLink to UnderlineLink

    This is to compensate the new PrimaryLink component

- #### Primary Button & ButtonLink Shade

    The shade of the button is now using the `500` instead of `400`.


## 0.5.1 - 2021-12-26

### New Features

- #### New Snippets Wrap: clsx and fragment `<></>`
    
    You can select text then wrap it with clsx or React.Fragment shorthand.
    
    https://user-images.githubusercontent.com/55318172/147401848-3db5dba0-ef71-4f25-9f47-c7908beba69e.mp4


## 0.5.0 - 2021-12-21

### New Features

- #### Expansion Pack
    You can easily add expansion such as React Hook Form + Components, Storybook, and more just using a single command line.

    https://user-images.githubusercontent.com/55318172/146631994-e1cac137-1664-4cfe-950b-a96decc1eaa6.mp4

    Check out the [expansion pack repository](https://github.com/theodorusclarence/expansion-pack) for the commands

### Improvements & Bug Fixes

- #### Can't Use Layout Fill on NextImage

    Using layout fill will make the width and height optional

- #### Vertically center Button & ButtonLink

    Adds `items-center` to make the button vertically centered


## 0.4.1 - 2021-12-12

### New Features

- #### Tailwind CSS v3
    
    The color palette configuration is also updated accordingly. 

## 0.4.0 - 2021-12-02

### New Features

- #### Button & ButtonLink Variants

    - New Variant: **Outline** and **Ghost**, you can also add `isDarkBg` prop if you are using these variants with dark background.
    - Animated Underline style on **Primary**, **Dark**, **Light** is removed
    - Added `ring-primary-500` on `focus-visible`

    ![Button Variants](https://user-images.githubusercontent.com/55318172/144385213-632b3e1f-9a0e-4184-82e0-7905ee3318b4.gif)

- #### ArrowLink


    Adds an animated arrow, this component is Polymorphic, the default element is `CustomLink`, you can extend it with `as` prop.

    ```tsx
    <ArrowLink
      as={ButtonLink}
      variant='light'
      href='/'
    >
      Register now
    </ArrowLink>
    ```

    ![Arrow Link Feature](https://user-images.githubusercontent.com/55318172/144385991-f3521d52-e0a8-49c5-8e87-409231fdd5b6.gif)

- #### Change default theme to white

    | ![Home Page](https://user-images.githubusercontent.com/55318172/144386763-00e6c3fd-ee2e-4c9e-87f8-18b036bdc2e1.png) | ![404](https://user-images.githubusercontent.com/55318172/144386764-0e4b4fb0-35a8-4725-a795-f998b06543a1.png) |
    | - | - |

### Improvements & Bug Fixes

- #### Split Next.js Link Props Type

    Now, to add props to Next.js `<Link>` component, you can use `nextLinkProps`.

    ```tsx
    <UnstyledLink 
      href='/'
      nextLinkProps={{
        shallow: true,
      }}
    >
      Link
    </UnstyledLink>
    ```

    The rest of `<a>` props can be directly added as a prop.

- #### Add Motion Safe to Animations

    All components animation respect user preference about motion.

## 0.3.0 - 2021-12-01

### New Features

- #### Create Branch & Auto Resolve Issue Actions

    | ![Create Branch Actions](https://user-images.githubusercontent.com/55318172/144379834-8c3e4d4f-d584-4253-9ad8-b9f1d468ed01.gif) <br> Auto Create Branch | ![Auto Resolve](https://user-images.githubusercontent.com/55318172/144382044-0132e755-9cd5-4805-a756-4086f67b3282.gif) <br> Auto Resolve  |
    | :--: | :--: |

    You have to install the app for your organization/account/repository from the [GitHub Marketplace](https://github.com/marketplace/create-issue-branch) for this to work.

    The branch will be created on **assign** with format `i${number}-${issue_title_lowercase}`.

- #### Custom Tailwind CSS Class Sorter

    Classes are sorted using [prettier-plugin-sort-class-names](https://github.com/PutziSan/prettier-plugin-sort-class-names) with custom class order on [this file](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/prettier-plugin-sort-class-names-order) and custom variant order on [prettierrc](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/.prettierrc.js)

    With this plugin, we can now safely check the order of the classes using the preconfigured lint action.

## 0.2.0 - 2021-11-10

### New Features

- #### Jest

    Jest is configured and will be run every push on Github Actions

- #### Lint Github Action

    1. **ESLint** - will fail if there are any warning and error.
    2. **Type Check** - will fail on `tsc` error.
    3. **Prettier Check** - will fail if there are any formatting error.
    4. **Test** - will fail if there are any test failure.

## 0.1.0

### New Features

- #### Installed Packages

    1. [clsx](https://bundlephobia.com/package/clsx@latest), utility for constructing `className` strings conditionally.
    2. [react-icons](https://bundlephobia.com/package/react-icons@latest), svg react icons of popular icon packs.

- #### UnstyledLink Component

    Used as a component for Next.js Link. Will render out Next/Link if the href started with `/` or `#`, else will render an `a` tag with `target='_blank'`. Also add a cursor style for outside links

- #### CustomLink Component

    ![customlink](https://user-images.githubusercontent.com/55318172/129183546-4e8c2059-0493-4459-a1e9-755fbd32fe39.gif)


- #### Absolute Import

    You can import without using relative path

    ```tsx
    import Nav from '../../../components/Nav';

    simplified to

    import Nav from '@/components/Nav';
    ```

- #### Seo Component

    Configure the default in `src/components/Seo.tsx`. If you want to use the default, just add `<Seo />` on top of your page.

    You can also customize it per page by overriding the title, description as props

    ```tsx
    <Seo title='Next.js Tailwind Starter' description='your description' />
    ```

    or if you want to still keep the title like `%s | Next.js Tailwind Starter`, you can use `templateTitle` props.

- #### Custom 404 Page

![404](https://user-images.githubusercontent.com/55318172/129184274-d90631f2-6688-4ed2-bef2-a4d018a4863c.gif)

- #### Workspace Snippets

Snippets such as React import, useState, useEffect, React Component. [View more](/.vscode/typescriptreact.code-snippets)

- #### Husky, Prettier, Lint, and Commitlint Configured

    3 Husky hooks including:

    1. pre-commit, running `next lint` and format the code using prettier
    2. commit-msg, running commitlint to ensure the use of [Conventional Commit](https://theodorusclarence.com/library/conventional-commit-readme) for commit messages
    3. post-merge, running `yarn` every `git pull` or after merge to ensure all new packages are installed and ready to go

- #### Default Favicon Declaration

    Use [Favicon Generator](https://www.favicon-generator.org/) and then overwrite the files in `/public/favicon`

- #### Default Tailwind CSS Base Styles

    There are default styles for responsive heading sizes, and `.layout` to support a max-width for larger screen size. Find more about it on [my blog post](https://theodorusclarence.com/blog/tailwindcss-best-practice#1-using-layout-class-or-container)

- #### Open Graph Generator

    | ![image](https://user-images.githubusercontent.com/55318172/137617070-806a0509-84bd-4cae-a900-2ab17e418d8d.png) | ![image](https://user-images.githubusercontent.com/55318172/137617090-c24f684a-bfe5-41b6-8ba9-fa99bae5cadf.png) |
    | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |

    Open Graph is generated using [og.thcl.dev](https://og.thcl.dev), but please fork and self-host if your website is going to have a lot of traffic.

    Check out the [repository](https://github.com/theodorusclarence/og) to see the API parameters.

- #### Preloaded & Self Hosted Inter Fonts

    Inter fonts is a variable fonts that is self hosted and preloaded.

## Snippets

This starter is equipped with workspace-snippets, it is encouraged to use it, especially the `np` and `rc`

### Next.js Page

File inside `src/pages` will be the webpage route, there are 2 things that need to be added in Next.js page:

1. Seo component
2. Layout class to give constraint to viewport width. [Read more about layout class](https://theodorusclarence.com/blog/tailwindcss-best-practice#1-using-layout-class-or-container).

Snippets: `np`

```tsx
import * as React from 'react';
import Seo from '@/components/Seo';
export default function TestPage() {
  return (
    <>
      <Seo templateTitle='Test' />
      <main>
        <section className=''>
          <div className='layout'></div>
        </section>
      </main>
    </>
  );
}
```

### React Components

To make a new component, It is encouraged to use `export default function`. Because when we need to rename it, we only need to do it once.

Snippets: `rc`

```tsx
import * as React from 'react';
export default function Component() {
  return <div></div>;
}
```

#### Import React

Snippets: `ir`

```tsx
import * as React from 'react';
```

#### Import Next Image

Snippets: `imimg`

```tsx
import Image from 'next/image';
```

#### Import Next Link

Snippets: `iml`

```tsx
import Link from 'next/link';
```

#### useState Hook

Snippets: `us`

```tsx
const [state, setState] = React.useState(initialState);
```

#### useEffect Hook

Snippets: `uf`

```tsx
React.useEffect(() => {}, []);
```

#### useReducer Hook

Snippets: `ur`

```tsx
const [state, dispatch] = React.useReducer(someReducer, {});
```

#### useRef Hook

Snippets: `urf`

```tsx
const someRef = React.useRef();
```

#### Region Comment

It is really useful when we need to group code. It is also collapsible in VSCode

Snippets: `reg`

```tsx
//#region  //*============== FORM SUBMIT
//#endregion  //*============== FORM SUBMIT
```

You should also use [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) extension.
