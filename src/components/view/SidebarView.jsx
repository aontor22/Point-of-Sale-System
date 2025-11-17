import React, { useState } from "react";
import Sidebar, { SidebarItem, SidebarSectionTitle } from "../ui/sidebar";
import { sidebarData } from "../../data/SidebarData";

const SidebarView = () => {
  const [openMap, setOpenMap] = useState({});
  const toggle = (key) => setOpenMap((m) => ({ ...m, [key]: !m[key] }));

  return (
    <main className="App">
      <Sidebar>
        {sidebarData.map((section) => (
          <React.Fragment key={section.title}>
            <SidebarSectionTitle>{section.title}</SidebarSectionTitle>

            {section.items.map((item) => {
              const Icon = item.icon;
              const hasChildren =
                Array.isArray(item.subItems) && item.subItems.length > 0;
              const key = `${section.title}:${item.name}`;
              const isOpen = !!openMap[key];

              if (!hasChildren) {
                return (
                  <SidebarItem
                    key={key}
                    icon={Icon ? <Icon /> : null}
                    text={item.name}
                    active={item.active}
                    alert={item.alert}
                    to={item.path}
                  />
                );
              }

              return (
                <React.Fragment key={key}>
                  <SidebarItem
                    icon={Icon ? <Icon /> : null}
                    text={item.name}
                    active={item.active}
                    isParent
                    open={isOpen}
                    onClick={() => toggle(key)}
                  />
                  <ul
                    className={`pl-2 ${
                      isOpen ? "max-h-96" : "max-h-0"
                    } overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                  >
                    {item.subItems.map((sub) => {
                      const subKey =
                        typeof sub === "string" ? sub : sub.name;
                      const subText =
                        typeof sub === "string" ? sub : sub.name;
                      const subActive =
                        typeof sub === "object" && sub.active;
                      const subPath =
                        typeof sub === "object" ? sub.path : undefined;

                      return (
                        <SidebarItem
                          key={subKey}
                          text={subText}
                          active={subActive}
                          className="pl-9 text-sm"
                          to={subPath}
                        />
                      );
                    })}
                  </ul>
                </React.Fragment>
              );
            })}

            <hr className="my-3" />
          </React.Fragment>
        ))}
      </Sidebar>
    </main>
  );
};

export default SidebarView;
