function foo1() {
  console.log('bar');
}

export function foo(p: boolean) {
  if (p) {
    foo1();
  }

  console.log('Hello world');
}
