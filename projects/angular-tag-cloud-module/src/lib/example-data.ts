import { CloudData } from './tag-cloud.interfaces';

export function randomData(cnt?: number): CloudData[] {
  if (!cnt) { cnt = 20; }

  const cd: CloudData[] = [];

  for (let i = 0; i < cnt; i++) {
    let link: string;
    let color: string;
    let external: boolean;
    let weight = 5;
    let text = '';
    let rotate = 0;
    let tooltip = '';

    // randomly set link attribute and external
    if (Math.random() >= 0.5) {
      link = 'http://example.org';
      if (Math.random() >= 0.5) { external = true; }
    }

    // randomly rotate some elements (less probability)
    if (Math.random() >= 0.8) {
      const plusMinus = Math.random() >= 0.5 ? '' : '-';
      rotate = Math.floor(Math.random() * Number(`${plusMinus}20`) + 1);
    }

    // randomly set color attribute
    if (Math.random() >= 0.5) {
      color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    // set random weight
    weight = Math.floor((Math.random() * 10) + 1);

    text = `weight-${weight}`;
    if (color) { text += '-color'; }
    if (link) { text += '-link'; }
    if (external) { text += '-external'; }

    // add a tooltip
    tooltip = `tooltip`;

    const el: CloudData = {
      text: text,
      weight: weight,
      color: color,
      link: link,
      external: external,
      rotate: rotate,
      tooltip: tooltip
    };

    cd.push(el);
  }
  console.log(cd);
  return cd;
}

export const staticExampleData: CloudData[] = [
  {
    'text': 'example-1',
    'weight': 1,
    'color': '#bbbbbb',
    'link': 'http://example.org',
    'external': true,
    'rotate': 2,
    'tooltip': 'tooltip-1'
  },
  {
    'text': 'example-2',
    'weight': 2,
    'tooltip': 'tooltip-2'
  },
  {
    'text': 'example-3',
    'weight': 3
  },
  {
    'text': 'example-4',
    'weight': 4,
    'color': 'red'
  },
  {
    'text': 'example-5',
    'weight': 5,
    'color': '#6e3f83'
  },
  {
    'text': 'example-6',
    'weight': 6,
    'color': '#bbbbbb'
  },
  {
    'text': 'example-7',
    'weight': 7,
    'link': 'http://example.org',
    'rotate': 0
  },
  {
    'text': 'example-8',
    'weight': 8,
    'rotate': -2,
    'tooltip': 'tooltip-8'
  },
  {
    'text': 'example-9',
    'link': 'http://example.org',
    'external': false,
    'weight': 9
  },
  {
    'text': 'example-10',
    'weight': 10,
    'tooltip': 'tooltip-10'
  }
];
