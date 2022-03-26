using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VatDiChuyen : MonoBehaviour
{
    private float vantoc=3f;
    private bool sangtrai=true;
    GameObject Mario;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void Awake()
    {
        Mario = GameObject.FindGameObjectWithTag("Player");
    }

    private void FixedUpdate()
    {
        Vector2 DiChuyen = transform.position;
        if (sangtrai)
        {
            DiChuyen.x -= vantoc * Time.deltaTime;
        }
        else
        {
            DiChuyen.x += vantoc * Time.deltaTime;
        }
        transform.position = DiChuyen;
        
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.contacts[0].normal.x > 0 && collision.collider.tag!="Player")
        {
            sangtrai = false;
            QuayMat();
        } else if (collision.contacts[0].normal.x < 0 && collision.collider.tag != "Player")
        {
            sangtrai = true;
            QuayMat();
        }
    }

    void QuayMat()
    {
        // nếu mario quay mặt sang trái
        //sangtrai = !sangtrai;
        Vector2 HuongQuay = transform.localScale;
        // đổi chiều mario transform.localScale.X = 1: hướng mặt mặc định của mario (phải),
        // transform.localScale.X=-1: quay mặt ngược lại (trái)
        HuongQuay.x *= -1;
        transform.localScale = HuongQuay;
    }
}
