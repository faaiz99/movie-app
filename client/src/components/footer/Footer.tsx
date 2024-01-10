import { Footer as Component } from 'flowbite-react';

export const Footer = ()=>{
  return (
    <Component container>
      <Component.Copyright href="#" by="Flowbite™" year={2022} />
      <Component.LinkGroup>
        <Component.Link href="#">About</Component.Link>
        <Component.Link href="#">Privacy Policy</Component.Link>
        <Component.Link href="#">Licensing</Component.Link>
        <Component.Link href="#">Contact</Component.Link>
      </Component.LinkGroup>
    </Component>
  );
}
