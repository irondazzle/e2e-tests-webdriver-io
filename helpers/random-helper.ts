const loremIpsumWords = `
  Lorem ipsum dolor sit amet consectetur adipiscing elit Etiam ipsum urna ultricies
  quis ante vel gravida rhoncus felis Donec justo felis viverra nec libero vitae
  dignissim hendrerit dolor Phasellus porttitor sem a fermentum molestie Etiam
  ullamcorper ipsum dapibus felis consequat quis elementum leo pellentesque Aliquam
  ultricies porttitor cursus Morbi et finibus libero Aenean fermentum et neque nec
  malesuada Nulla urna quam mattis ac pretium nec condimentum quis tortor
  Curabitur blandit enim vel consectetur pharetra arcu lacus malesuada eros et
  pulvinar turpis est vel eros Nullam turpis sem semper quis elit vitae vulputate
  facilisis augue Suspendisse molestie risus sit amet nunc egestas at porttitor
  nulla lacinia Proin et sollicitudin odio Praesent ultricies enim ut nulla
  scelerisque commodo Donec ut libero eget sapien molestie porta Donec eleifend
  vulputate bibendum
`
  .replace(/\n/g, ' ')
  .split(' ')
  .map(word => word.trim())
  .filter(word => !!word);

export function randomNumber(from: number, to: number = from): number {
  return Math.round(Math.random() * (to - from)) + from;
}

export function randomText(from: number, to: number = from): string {
  const wordsCount = randomNumber(from, to);
  const words = new Array(wordsCount)
    .fill('_')
    .map(() => loremIpsumWords[randomNumber(0, loremIpsumWords.length - 1)]);

  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

  return words.join(' ');
}
