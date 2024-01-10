import { Avatar, Dropdown, Navbar as Component } from 'flowbite-react';

export const Navbar = ()=>{
  return (
    <Component fluid rounded>
      <Component.Brand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Component.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Component.Toggle />
      </div>
      <Component.Collapse>
        <Component.Link href="#" active>
          Home
        </Component.Link>
        <Component.Link href="#">About</Component.Link>
        <Component.Link href="#">Services</Component.Link>
        <Component.Link href="#">Pricing</Component.Link>
        <Component.Link href="#">Contact</Component.Link>
      </Component.Collapse>
    </Component>
  );
}
